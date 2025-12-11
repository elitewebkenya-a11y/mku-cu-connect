import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, Plus } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const BlogPostsManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    is_published: true,
  });

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }), []);

  const quillFormats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'direction', 'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, featured_image, is_published, published_at, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch blog posts: " + error.message);
      return;
    }

    setPosts(data || []);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const dataToSubmit = {
        title: formData.title,
        slug,
        excerpt: formData.excerpt || null,
        content: formData.content,
        featured_image: formData.featured_image || null,
        is_published: formData.is_published,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (editingId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(dataToSubmit)
          .eq("id", editingId);

        if (error) throw error;
        toast.success("Blog post updated successfully");
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .insert([dataToSubmit]);

        if (error) throw error;
        toast.success("Blog post created successfully");
      }

      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      featured_image: post.featured_image || "",
      is_published: post.is_published ?? true,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete blog post");
      return;
    }

    toast.success("Blog post deleted successfully");
    fetchPosts();
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      is_published: true,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/50 border-b border-border">
          <div className="flex items-center gap-2">
            {editingId ? <Pencil className="h-5 w-5 text-primary" /> : <Plus className="h-5 w-5 text-primary" />}
            <div>
              <CardTitle className="text-lg">{editingId ? "Edit" : "Create New"} Blog Post</CardTitle>
              <CardDescription>Write and publish blog articles</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter post title..."
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featured_image">Featured Image URL</Label>
              <Input
                id="featured_image"
                type="url"
                value={formData.featured_image}
                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="bg-background"
              />
              {formData.featured_image && (
                <div className="mt-2 rounded-lg overflow-hidden border border-border">
                  <img
                    src={formData.featured_image}
                    alt="Preview"
                    className="w-full h-40 object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt (Short Description)</Label>
              <Input
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary of the post..."
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label>Content *</Label>
              <div className="border border-border rounded-lg overflow-hidden bg-background">
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(value) => setFormData({ ...formData, content: value })}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Write your blog post content here..."
                  className="min-h-[300px]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
              />
              <Label htmlFor="is_published" className="cursor-pointer">
                {formData.is_published ? "Published" : "Draft"}
              </Label>
            </div>

            <div className="flex gap-3">
              <Button type="submit" disabled={loading} className="gap-2">
                {loading ? "Saving..." : editingId ? "Update Post" : "Publish Post"}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm">
        <CardHeader className="bg-muted/50 border-b border-border">
          <CardTitle className="text-lg">All Blog Posts</CardTitle>
          <CardDescription>{posts.length} post(s) total</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No blog posts yet. Create your first post above!
                    </TableCell>
                  </TableRow>
                ) : (
                  posts.map((post) => (
                    <TableRow key={post.id} className="hover:bg-muted/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {post.featured_image && (
                            <img
                              src={post.featured_image}
                              alt=""
                              className="w-10 h-10 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-foreground">{post.title}</p>
                            <p className="text-xs text-muted-foreground">{post.slug}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.is_published 
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}>
                          {post.is_published ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {post.published_at 
                          ? new Date(post.published_at).toLocaleDateString() 
                          : "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(post)}
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(post.id)}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};