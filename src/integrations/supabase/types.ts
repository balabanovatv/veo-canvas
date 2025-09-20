export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      chat_logs: {
        Row: {
          content: string | null
          created_at: string | null
          first_name: string | null
          id: number
          metadata: Json | null
          role: string | null
          session_id: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      chat_logs_alphaschool: {
        Row: {
          content: string | null
          created_at: string | null
          first_name: string | null
          id: number
          metadata: Json | null
          role: string | null
          session_id: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      chat_logs_bondervill: {
        Row: {
          content: string | null
          created_at: string | null
          first_name: string | null
          id: number
          metadata: Json | null
          role: string | null
          session_id: string
          user_id: string | null
          username: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id: string
          user_id?: string | null
          username?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: number
          metadata?: Json | null
          role?: string | null
          session_id?: string
          user_id?: string | null
          username?: string | null
        }
        Relationships: []
      }
      conversation_memory: {
        Row: {
          call_id: string
          created_at: string | null
          dialogue: Json
          id: string
          summary: string | null
          user_id: string | null
        }
        Insert: {
          call_id: string
          created_at?: string | null
          dialogue: Json
          id?: string
          summary?: string | null
          user_id?: string | null
        }
        Update: {
          call_id?: string
          created_at?: string | null
          dialogue?: Json
          id?: string
          summary?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      credits: {
        Row: {
          balance: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      dialogues: {
        Row: {
          created_at: string | null
          dialogue_uuid: string
          id: number
          prompt_history: Json | null
          status: string
          user_chat_id: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          dialogue_uuid: string
          id?: never
          prompt_history?: Json | null
          status: string
          user_chat_id: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          dialogue_uuid?: string
          id?: never
          prompt_history?: Json | null
          status?: string
          user_chat_id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      documents_bondervill: {
        Row: {
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
        }
        Relationships: []
      }
      job_files: {
        Row: {
          created_at: string | null
          duration: number | null
          file_url: string
          id: string
          job_id: string
          size: number | null
          thumb_url: string | null
        }
        Insert: {
          created_at?: string | null
          duration?: number | null
          file_url: string
          id?: string
          job_id: string
          size?: number | null
          thumb_url?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: number | null
          file_url?: string
          id?: string
          job_id?: string
          size?: number | null
          thumb_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_files_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          created_at: string | null
          dialogue_uuid: string
          error: string | null
          finished_at: string | null
          id: string
          n8n_execution_id: string | null
          quantity: number
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          dialogue_uuid: string
          error?: string | null
          finished_at?: string | null
          id?: string
          n8n_execution_id?: string | null
          quantity?: number
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          dialogue_uuid?: string
          error?: string | null
          finished_at?: string | null
          id?: string
          n8n_execution_id?: string | null
          quantity?: number
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      n8n_chat_histories: {
        Row: {
          id: number
          message: Json
          session_id: string
        }
        Insert: {
          id?: number
          message: Json
          session_id: string
        }
        Update: {
          id?: number
          message?: Json
          session_id?: string
        }
        Relationships: []
      }
      products_bondervill: {
        Row: {
          availability: string | null
          breadcrumbs: string | null
          currency: string | null
          description: string | null
          id: number
          price: number | null
          sku: string | null
          title: string
          url: string
        }
        Insert: {
          availability?: string | null
          breadcrumbs?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          price?: number | null
          sku?: string | null
          title: string
          url: string
        }
        Update: {
          availability?: string | null
          breadcrumbs?: string | null
          currency?: string | null
          description?: string | null
          id?: number
          price?: number | null
          sku?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: []
      }
      purchases: {
        Row: {
          amount_cents: number | null
          created_at: string | null
          credits: number | null
          currency: string | null
          id: string
          provider: string | null
          provider_payment_id: string | null
          status: string | null
          type: string | null
          user_id: string
        }
        Insert: {
          amount_cents?: number | null
          created_at?: string | null
          credits?: number | null
          currency?: string | null
          id?: string
          provider?: string | null
          provider_payment_id?: string | null
          status?: string | null
          type?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number | null
          created_at?: string | null
          credits?: number | null
          currency?: string | null
          id?: string
          provider?: string | null
          provider_payment_id?: string | null
          status?: string | null
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reminders_alpha_school: {
        Row: {
          chat_id: string | null
          contact_info: string | null
          created_at: string
          description: string | null
          end_at_utc: string
          event_id: string
          first_name: string | null
          id: string
          original_event_id: string | null
          remind_at_utc: string | null
          reminded_at: string | null
          start_at_utc: string
          status: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_id?: string | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          end_at_utc: string
          event_id: string
          first_name?: string | null
          id?: string
          original_event_id?: string | null
          remind_at_utc?: string | null
          reminded_at?: string | null
          start_at_utc: string
          status: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_id?: string | null
          contact_info?: string | null
          created_at?: string
          description?: string | null
          end_at_utc?: string
          event_id?: string
          first_name?: string | null
          id?: string
          original_event_id?: string | null
          remind_at_utc?: string | null
          reminded_at?: string | null
          start_at_utc?: string
          status?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_alpha_school_original_event_id_fkey"
            columns: ["original_event_id"]
            isOneToOne: false
            referencedRelation: "reminders_alpha_school"
            referencedColumns: ["event_id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          id: string
          price_id: string | null
          provider: string | null
          provider_subscription_id: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          price_id?: string | null
          provider?: string | null
          provider_subscription_id?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          price_id?: string | null
          provider?: string | null
          provider_subscription_id?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          chat_id: number
          created_at: string | null
          generated_titles: string | null
          id: number
          video_file_id: string | null
        }
        Insert: {
          chat_id: number
          created_at?: string | null
          generated_titles?: string | null
          id?: number
          video_file_id?: string | null
        }
        Update: {
          chat_id?: number
          created_at?: string | null
          generated_titles?: string | null
          id?: number
          video_file_id?: string | null
        }
        Relationships: []
      }
      vector_documents: {
        Row: {
          content: string | null
          created_at: string | null
          document_id: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          document_id?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      create_job: {
        Args:
          | { p_cost: number; p_dialogue_uuid: string; p_prompt: string }
          | { p_cost?: number; p_dialogue_uuid: string; p_prompt: string }
        Returns: Json
      }
      get_price_by_sku: {
        Args: { p_sku: string }
        Returns: {
          currency: string
          price: number
          sku: string
          title: string
          url: string
        }[]
      }
      get_product: {
        Args: { lim?: number; p_query: string }
        Returns: {
          currency: string
          price: number
          sku: string
          title: string
          url: string
        }[]
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_vector_documents: {
        Args: { filter: Json; match_count: number; query_embedding: string }
        Returns: {
          content: string
          id: string
          similarity: number
        }[]
      }
      search_products: {
        Args: { lim?: number; q: string }
        Returns: {
          currency: string
          price: number
          sku: string
          title: string
          url: string
        }[]
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      unaccent: {
        Args: { "": string }
        Returns: string
      }
      unaccent_imm: {
        Args: { "": string }
        Returns: string
      }
      unaccent_init: {
        Args: { "": unknown }
        Returns: unknown
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
