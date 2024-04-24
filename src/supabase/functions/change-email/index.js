import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const updateUserEmail = async (userId, newEmail, supabase) => {
  const { data: user, error } = await supabase.auth.admin.updateUserById(
    userId,
    { email: newEmail }
  )
  if (error) throw error
  
  console.log(user)
}

const updateUsersData = async (userId, newEmail, supabase) => {
  const { data: user, error } = await supabase
    .from('users_data')
    .update({
        email: newEmail
        })
    .match({ id: userId })
    if (error) throw error
    return user;
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
        
        const data = await req.json();
        const userId = data.userId;
        const newEmail = data.newEmail;

        if (userId) {

            const userData = await updateUsersData(userId, newEmail, supabase);

            const user = await updateUserEmail(userId, newEmail, supabase);            
            return new Response(JSON.stringify({
                "message": "Email changed successfully! Please logout and login again.",
                "user": user,
                "userData": userData
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
