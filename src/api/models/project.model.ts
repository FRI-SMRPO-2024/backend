import supabase from '../../utils/supabase';


export interface ProjectModel
{
    id: number;
    name: string;
    description: string;
    documentation: string;
    updated_at: string;
}