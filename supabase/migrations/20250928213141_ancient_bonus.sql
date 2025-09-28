@@ .. @@
 CREATE POLICY "Enable insert for authenticated users"
   ON profiles
   FOR INSERT
   TO authenticated
   WITH CHECK (auth.uid() = id);

+-- Allow service role to insert profiles (needed for trigger)
+CREATE POLICY "Enable insert for service role"
+  ON profiles
+  FOR INSERT
+  TO service_role
+  WITH CHECK (true);
+
 -- Super admin policies (separate from regular user policies)