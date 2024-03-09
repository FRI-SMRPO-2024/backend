import supabase from '../../utils/supabase';


export interface UserModel
{
    id: string;
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}