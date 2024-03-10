import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const deleteUser = async (supabase, userId)=>{
    const { data, error } = await supabase.auth.admin.deleteUser(
        userId
    )
    if (error) throw error;
    return data;
};

const parseTokenToEmail = async (header:string) => {
  const token = header.split(" ")[1];
  const tokenArray = token.split(".");
  const payload = JSON.parse(atob(tokenArray[1]));
  const email = payload.email;
  return email;
}

const checkPermission = async (email:string, userId:string, supabase:any) => {
  // Get from auth.users the user with the email and check if email and userId match
  const { data, error } = await supabase.from("users_data").select("id").eq("email", email);
  if (error) throw error;
  if (data.length === 0) {
    throw new Error("User not found");
  }
  if (data[0].id !== userId) {
    throw new Error("Permission denied");
  }
  return true;
}


serve(async (req)=>{
    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_ANON_KEY") ?? "", {
        global: {
            headers: {
                Authorization: ("Bearer " + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")) ?? ""
            }
        }
    });
    try {
        const authHeader = req.headers.get("Authorization");
        const data = await req.json();
        const userId = data.userId;
        
        const email = await parseTokenToEmail(authHeader);
        const permission = await checkPermission(email, userId, supabase);
        
        if (permission) {
            const user = await deleteUser(supabase, userId);
            return new Response(JSON.stringify({
                "message": "User deleted successfully",
                "user": user
            }), {
                headers: {
                    "Content-Type": "application/json"
                },
                status: 200
            });
        } else {
            throw new Error("Permission denied");
        }        
    } catch (error) {
        return new Response(JSON.stringify({
            message: error.message
        }), {
            headers: {
                "Content-Type": "application/json"
            },
            status: 400
        });
    }
});
