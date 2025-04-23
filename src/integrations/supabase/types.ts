export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string
          created_at: string | null
          downvotes: number | null
          id: string
          parent_id: string | null
          record_id: string
          record_type: string
          updated_at: string | null
          upvotes: number | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          parent_id?: string | null
          record_id: string
          record_type: string
          updated_at?: string | null
          upvotes?: number | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          downvotes?: number | null
          id?: string
          parent_id?: string | null
          record_id?: string
          record_type?: string
          updated_at?: string | null
          upvotes?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          company_type: Database["public"]["Enums"]["company_type"] | null
          country: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          id: string
          industry: string | null
          last_modified_by: string | null
          logo_url: string | null
          name: string
          notes: string | null
          phone: string | null
          revenue_tier: Database["public"]["Enums"]["revenue_tier"] | null
          state: string | null
          status: Database["public"]["Enums"]["company_status"] | null
          updated_at: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_type?: Database["public"]["Enums"]["company_type"] | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          last_modified_by?: string | null
          logo_url?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          revenue_tier?: Database["public"]["Enums"]["revenue_tier"] | null
          state?: string | null
          status?: Database["public"]["Enums"]["company_status"] | null
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_type?: Database["public"]["Enums"]["company_type"] | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          industry?: string | null
          last_modified_by?: string | null
          logo_url?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          revenue_tier?: Database["public"]["Enums"]["revenue_tier"] | null
          state?: string | null
          status?: Database["public"]["Enums"]["company_status"] | null
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          company_id: string | null
          country: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          first_name: string
          id: string
          last_modified_by: string | null
          last_name: string
          mobile: string | null
          notes: string | null
          phone: string | null
          state: string | null
          status: Database["public"]["Enums"]["contact_status"] | null
          title: string | null
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_modified_by?: string | null
          last_name: string
          mobile?: string | null
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          title?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          company_id?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_modified_by?: string | null
          last_name?: string
          mobile?: string | null
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["contact_status"] | null
          title?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      hospitals: {
        Row: {
          address: string | null
          beds: number | null
          city: string | null
          country: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          id: string
          last_modified_by: string | null
          logo_url: string | null
          name: string
          notes: string | null
          phone: string | null
          state: string | null
          status: Database["public"]["Enums"]["hospital_status"] | null
          type: Database["public"]["Enums"]["hospital_type"] | null
          updated_at: string | null
          website: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          beds?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          last_modified_by?: string | null
          logo_url?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["hospital_status"] | null
          type?: Database["public"]["Enums"]["hospital_type"] | null
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          beds?: number | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          id?: string
          last_modified_by?: string | null
          logo_url?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          state?: string | null
          status?: Database["public"]["Enums"]["hospital_status"] | null
          type?: Database["public"]["Enums"]["hospital_type"] | null
          updated_at?: string | null
          website?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      linked_records: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          last_modified_by: string | null
          notes: string | null
          relationship_type: string | null
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_modified_by?: string | null
          notes?: string | null
          relationship_type?: string | null
          source_id: string
          source_type: string
          target_id: string
          target_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_modified_by?: string | null
          notes?: string | null
          relationship_type?: string | null
          source_id?: string
          source_type?: string
          target_id?: string
          target_type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          action_url: string | null
          content: string
          created_at: string | null
          id: string
          read: boolean | null
          record_id: string | null
          record_type: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          action_url?: string | null
          content: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          record_id?: string | null
          record_type?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          action_url?: string | null
          content?: string
          created_at?: string | null
          id?: string
          read?: boolean | null
          record_id?: string | null
          record_type?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      physician_hospitals: {
        Row: {
          created_at: string | null
          hospital_id: string
          physician_id: string
        }
        Insert: {
          created_at?: string | null
          hospital_id: string
          physician_id: string
        }
        Update: {
          created_at?: string | null
          hospital_id?: string
          physician_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "physician_hospitals_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "physician_hospitals_physician_id_fkey"
            columns: ["physician_id"]
            isOneToOne: false
            referencedRelation: "physicians"
            referencedColumns: ["id"]
          },
        ]
      }
      physicians: {
        Row: {
          address: string | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string | null
          created_by: string | null
          email: string | null
          first_name: string
          id: string
          last_modified_by: string | null
          last_name: string
          notes: string | null
          phone: string | null
          specialty: Database["public"]["Enums"]["physician_specialty"]
          state: string | null
          status: Database["public"]["Enums"]["hospital_status"] | null
          title: string | null
          updated_at: string | null
          zip: string | null
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_modified_by?: string | null
          last_name: string
          notes?: string | null
          phone?: string | null
          specialty: Database["public"]["Enums"]["physician_specialty"]
          state?: string | null
          status?: Database["public"]["Enums"]["hospital_status"] | null
          title?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_modified_by?: string | null
          last_name?: string
          notes?: string | null
          phone?: string | null
          specialty?: Database["public"]["Enums"]["physician_specialty"]
          state?: string | null
          status?: Database["public"]["Enums"]["hospital_status"] | null
          title?: string | null
          updated_at?: string | null
          zip?: string | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string | null
          id: string
          notes: string | null
          record_id: string
          record_type: string
          updated_at: string | null
          user_id: string
          value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          notes?: string | null
          record_id: string
          record_type: string
          updated_at?: string | null
          user_id: string
          value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          notes?: string | null
          record_id?: string
          record_type?: string
          updated_at?: string | null
          user_id?: string
          value?: number
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          first_name: string | null
          following_records: Json | null
          id: string
          last_login: string | null
          last_modified_by: string | null
          last_name: string | null
          phone: string | null
          points: number | null
          preferences: Json | null
          role: string
          status: Database["public"]["Enums"]["user_status"]
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          first_name?: string | null
          following_records?: Json | null
          id?: string
          last_login?: string | null
          last_modified_by?: string | null
          last_name?: string | null
          phone?: string | null
          points?: number | null
          preferences?: Json | null
          role: string
          status?: Database["public"]["Enums"]["user_status"]
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          first_name?: string | null
          following_records?: Json | null
          id?: string
          last_login?: string | null
          last_modified_by?: string | null
          last_name?: string | null
          phone?: string | null
          points?: number | null
          preferences?: Json | null
          role?: string
          status?: Database["public"]["Enums"]["user_status"]
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      company_status: "active" | "inactive" | "prospect" | "former"
      company_type:
        | "corporate"
        | "distributor"
        | "supplier"
        | "partner"
        | "competitor"
        | "other"
      contact_status: "active" | "inactive" | "lead"
      hospital_status: "active" | "inactive" | "prospect"
      hospital_type:
        | "general"
        | "specialized"
        | "teaching"
        | "psychiatric"
        | "rehabilitation"
        | "other"
      physician_specialty:
        | "cardiology"
        | "dermatology"
        | "endocrinology"
        | "gastroenterology"
        | "neurology"
        | "oncology"
        | "orthopedics"
        | "pediatrics"
        | "psychiatry"
        | "radiology"
        | "surgery"
        | "urology"
        | "other"
      revenue_tier: "enterprise" | "mid-market" | "small-business" | "startup"
      user_role: "admin" | "corporate" | "distributor"
      user_status: "active" | "inactive" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      company_status: ["active", "inactive", "prospect", "former"],
      company_type: [
        "corporate",
        "distributor",
        "supplier",
        "partner",
        "competitor",
        "other",
      ],
      contact_status: ["active", "inactive", "lead"],
      hospital_status: ["active", "inactive", "prospect"],
      hospital_type: [
        "general",
        "specialized",
        "teaching",
        "psychiatric",
        "rehabilitation",
        "other",
      ],
      physician_specialty: [
        "cardiology",
        "dermatology",
        "endocrinology",
        "gastroenterology",
        "neurology",
        "oncology",
        "orthopedics",
        "pediatrics",
        "psychiatry",
        "radiology",
        "surgery",
        "urology",
        "other",
      ],
      revenue_tier: ["enterprise", "mid-market", "small-business", "startup"],
      user_role: ["admin", "corporate", "distributor"],
      user_status: ["active", "inactive", "pending"],
    },
  },
} as const
