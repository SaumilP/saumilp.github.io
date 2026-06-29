import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export default async (req: any, res: any) => {
  const { slug } = req.query;

  // GET: Retrieve view count
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("blog_post_views")
        .select("views")
        .eq("slug", slug)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows found
        throw error;
      }

      const views = data?.views || 0;
      return res.json({ views });
    } catch (err) {
      console.error("GET views error:", err);
      return res.json({ views: 0 });
    }
  }

  // POST: Increment view count
  if (req.method === "POST") {
    try {
      // Try to increment existing row
      const { data: existingData } = await supabase
        .from("blog_post_views")
        .select("views")
        .eq("slug", slug)
        .single();

      if (existingData) {
        // Update existing
        const { data } = await supabase
          .from("blog_post_views")
          .update({ views: existingData.views + 1 })
          .eq("slug", slug)
          .select();

        return res.json({ views: data?.[0]?.views || 0 });
      } else {
        // Insert new
        const { data } = await supabase
          .from("blog_post_views")
          .insert({ slug, views: 1 })
          .select();

        return res.json({ views: data?.[0]?.views || 1 });
      }
    } catch (err) {
      console.error("POST views error:", err);
      return res.status(500).json({ error: "Failed to increment views" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
};
