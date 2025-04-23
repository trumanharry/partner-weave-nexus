
-- Create linked records table for polymorphic relationships
CREATE TABLE linked_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID NOT NULL,
    source_type TEXT NOT NULL CHECK (source_type IN ('company', 'hospital', 'user', 'contact', 'physician')),
    target_id UUID NOT NULL,
    target_type TEXT NOT NULL CHECK (target_type IN ('company', 'hospital', 'user', 'contact', 'physician')),
    relationship_type TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_by UUID REFERENCES auth.users(id),
    last_modified_by UUID REFERENCES auth.users(id)
);

-- Create comments table with threading support
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content TEXT NOT NULL,
    record_id UUID NOT NULL,
    record_type TEXT NOT NULL CHECK (record_type IN ('company', 'hospital', 'user', 'contact', 'physician')),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    parent_id UUID REFERENCES comments(id), -- For threading
    upvotes INTEGER DEFAULT 0,
    downvotes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create ratings table
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value INTEGER NOT NULL CHECK (value >= 1 AND value <= 5),
    record_id UUID NOT NULL,
    record_type TEXT NOT NULL CHECK (record_type IN ('company', 'hospital', 'user', 'contact', 'physician')),
    user_id UUID NOT NULL REFERENCES auth.users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    -- Add a unique constraint to ensure one rating per user per record
    UNIQUE(user_id, record_id, record_type)
);

-- Create notifications table for activity tracking
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    type TEXT NOT NULL CHECK (type IN ('comment', 'rating', 'update', 'mention', 'system')),
    record_id UUID,
    record_type TEXT CHECK (record_type IN ('company', 'hospital', 'user', 'contact', 'physician')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Update user_profiles table to include the points system and preferences
ALTER TABLE user_profiles
ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS following_records JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- Enable RLS on all tables
ALTER TABLE linked_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Linked Records Policies
CREATE POLICY "Anyone can view linked records"
    ON linked_records FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can modify linked records"
    ON linked_records FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

-- Comments Policies
CREATE POLICY "Anyone can view comments"
    ON comments FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert their own comments"
    ON comments FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
    ON comments FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own comments"
    ON comments FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Ratings Policies
CREATE POLICY "Anyone can view ratings"
    ON ratings FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert their own ratings"
    ON ratings FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ratings"
    ON ratings FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ratings"
    ON ratings FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Notifications Policies
CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert notifications"
    ON notifications FOR INSERT
    TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM user_profiles
            WHERE user_id = auth.uid()
            AND role = 'admin'
        )
    );

CREATE POLICY "Users can update their own notifications"
    ON notifications FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Add triggers for updated_at
CREATE TRIGGER update_linked_records_updated_at
    BEFORE UPDATE ON linked_records
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ratings_updated_at
    BEFORE UPDATE ON ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notifications_updated_at
    BEFORE UPDATE ON notifications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
