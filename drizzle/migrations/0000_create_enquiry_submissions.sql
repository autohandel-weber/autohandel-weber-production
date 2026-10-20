CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 kind text NOT NULL,
 name text NOT NULL,
 email text NOT NULL,
 phone text NOT NULL DEFAULT '',
 subject text NOT NULL DEFAULT '',
 message text NOT NULL DEFAULT '',
 vehicle jsonb NOT NULL DEFAULT '{}'::jsonb,
 photo_paths jsonb NOT NULL DEFAULT '[]'::jsonb,
 email_status text NOT NULL DEFAULT 'not_configured'
);
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.contact_submissions IS 'Private contact and vehicle enquiries. Server writes only; owner accesses through Lovable Cloud.';