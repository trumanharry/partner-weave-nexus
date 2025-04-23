
-- Create contact status enum
CREATE TYPE contact_status AS ENUM ('active', 'inactive', 'lead');

-- Create contacts table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    company_id UUID REFERENCES companies(id),
    title TEXT,
    phone TEXT,
    mobile TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    notes TEXT,
    status contact_status DEFAULT 'lead',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_by UUID REFERENCES auth.users(id),
    last_modified_by UUID REFERENCES auth.users(id)
);

-- Create physician specialty enum
CREATE TYPE physician_specialty AS ENUM (
    'cardiology',
    'dermatology',
    'endocrinology',
    'gastroenterology',
    'neurology',
    'oncology',
    'orthopedics',
    'pediatrics',
    'psychiatry',
    'radiology',
    'surgery',
    'urology',
    'other'
);

-- Create physicians table
CREATE TABLE physicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT,
    specialty physician_specialty NOT NULL,
    title TEXT,
    phone TEXT,
    avatar_url TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    zip TEXT,
    country TEXT,
    notes TEXT,
    status hospital_status DEFAULT 'prospect',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_by UUID REFERENCES auth.users(id),
    last_modified_by UUID REFERENCES auth.users(id)
);

-- Create physician_hospitals junction table
CREATE TABLE physician_hospitals (
    physician_id UUID REFERENCES physicians(id) ON DELETE CASCADE,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    PRIMARY KEY (physician_id, hospital_id)
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE physicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE physician_hospitals ENABLE ROW LEVEL SECURITY;

-- Contacts Policies
CREATE POLICY "Anyone can view contacts"
    ON contacts FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can modify contacts"
    ON contacts FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Physicians Policies
CREATE POLICY "Anyone can view physicians"
    ON physicians FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can modify physicians"
    ON physicians FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Physician Hospitals Policies
CREATE POLICY "Anyone can view physician_hospitals"
    ON physician_hospitals FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can modify physician_hospitals"
    ON physician_hospitals FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Add triggers for updated_at
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_physicians_updated_at
    BEFORE UPDATE ON physicians
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

