import { useState, useEffect } from "react";
import { 
  Briefcase, 
  FileText, 
  Mail, 
  Settings as SettingsIcon, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  EyeOff,
  Download,
  X,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StandardHeader from "@/components/StandardHeader";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterService from "@/services/newsletterService";

// Input sanitization utility
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  image: string;
  published: boolean;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'blog' | 'newsletter' | 'settings'>('jobs');
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState('');

  // Simple authentication (you can enhance this later)
  const [adminPassword, setAdminPassword] = useState('amanex2025');

  // Default job openings data
  const defaultJobs: JobOpening[] = [
    {
      id: 1,
      title: "Sales Representative",
      department: "Sales & Marketing",
      location: "Accra, Ghana",
      type: "Full-time",
      experience: "2-3 years",
      description: "We're looking for a dynamic Sales Representative to join our team and help drive growth in the Ghanaian market.",
      requirements: [
        "Bachelor's degree in Business, Marketing, or related field",
        "2-3 years of sales experience in FMCG industry",
        "Strong communication and negotiation skills",
        "Proven track record of meeting sales targets",
        "Knowledge of the local market and consumer behavior"
      ],
      responsibilities: [
        "Develop and maintain relationships with key clients",
        "Achieve monthly and quarterly sales targets",
        "Conduct market research and competitor analysis",
        "Present product demonstrations and training sessions",
        "Prepare sales reports and forecasts"
      ]
    },
    {
      id: 2,
      title: "Marketing Coordinator",
      department: "Marketing",
      location: "Accra, Ghana",
      type: "Full-time",
      experience: "1-2 years",
      description: "Join our marketing team to help create compelling campaigns that connect with our customers.",
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "1-2 years of marketing experience",
        "Proficiency in digital marketing tools and platforms",
        "Creative thinking and problem-solving skills",
        "Experience with social media management"
      ],
      responsibilities: [
        "Assist in developing marketing campaigns and strategies",
        "Manage social media accounts and content creation",
        "Coordinate with external agencies and vendors",
        "Track and analyze campaign performance metrics",
        "Support event planning and execution"
      ]
    },
    {
      id: 3,
      title: "Supply Chain Specialist",
      department: "Operations",
      location: "Accra, Ghana",
      type: "Full-time",
      experience: "3-5 years",
      description: "Help optimize our supply chain operations to ensure efficient product distribution across Ghana.",
      requirements: [
        "Bachelor's degree in Supply Chain Management, Logistics, or related field",
        "3-5 years of supply chain experience",
        "Knowledge of inventory management systems",
        "Strong analytical and problem-solving skills",
        "Experience with ERP systems"
      ],
      responsibilities: [
        "Manage inventory levels and forecasting",
        "Coordinate with suppliers and logistics partners",
        "Optimize warehouse operations and distribution",
        "Monitor and improve supply chain performance",
        "Ensure compliance with quality standards"
      ]
    },
    {
      id: 4,
      title: "Customer Service Representative",
      department: "Customer Service",
      location: "Accra, Ghana",
      type: "Full-time",
      experience: "1-2 years",
      description: "Be the voice of our company and help deliver exceptional customer experiences.",
      requirements: [
        "High school diploma or equivalent",
        "1-2 years of customer service experience",
        "Excellent communication skills in English and local languages",
        "Patient and empathetic approach to customer issues",
        "Ability to work in shifts"
      ],
      responsibilities: [
        "Handle customer inquiries and complaints",
        "Process orders and track shipments",
        "Provide product information and support",
        "Maintain customer records and update databases",
        "Escalate complex issues to appropriate departments"
      ]
    }
  ];

  // Default blog posts data
  const defaultBlogs: BlogPost[] = [
    {
      id: 1,
      title: "Amanex Ghana: Pioneering Personal Care Excellence in West Africa",
      excerpt: "Discover how Amanex Ghana has become a leading force in personal care and home care products, bringing premium quality and innovative solutions to homes across West Africa.",
      content: "In the heart of West Africa, Amanex Ghana has emerged as a beacon of excellence in personal care and home care products. Since our establishment, we've been committed to transforming everyday routines into luxurious experiences, one product at a time. Our journey from a local startup to a trusted household name reflects our unwavering dedication to quality, innovation, and customer satisfaction.",
      category: "Company News",
      date: "2025-01-15",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      published: true
    },
    {
      id: 2,
      title: "Transform Your Home with Amanex: The Complete Guide to Fresh Living",
      excerpt: "Learn how to create a fresh, inviting home environment using Amanex's comprehensive range of air fresheners, cleaning products, and fabric care solutions.",
      content: "Your home is your sanctuary – a place where you should feel comfortable, relaxed, and refreshed. At Amanex Ghana, we understand that creating this perfect environment requires more than just basic cleaning. It's about crafting an experience that engages all your senses and makes every moment at home truly special.",
      category: "Home Care Tips",
      date: "2025-01-10",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      published: true
    },
    {
      id: 3,
      title: "The Science of Clean: How Amanex Products Keep Your Home Healthier",
      excerpt: "Discover the scientific approach behind Amanex's cleaning and personal care products, and learn how they contribute to a healthier, safer home environment.",
      content: "In today's world, cleanliness isn't just about appearance – it's about health, safety, and well-being. At Amanex Ghana, we understand that effective cleaning requires more than just removing visible dirt. It's about creating an environment that actively promotes health and prevents the spread of harmful microorganisms.",
      category: "Health & Wellness",
      date: "2025-01-05",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      published: true
    }
  ];

  useEffect(() => {
    // Load existing data from localStorage or initialize with defaults
    const savedJobs = localStorage.getItem('amanexJobs');
    const savedBlogs = localStorage.getItem('amanexBlogs');
    const savedPassword = localStorage.getItem('amanexAdminPassword');
    
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      // Initialize with default data if no saved data exists
      setJobs(defaultJobs);
      localStorage.setItem('amanexJobs', JSON.stringify(defaultJobs));
    }
    
    if (savedBlogs) {
      setBlogPosts(JSON.parse(savedBlogs));
    } else {
      // Initialize with default data if no saved data exists
      setBlogPosts(defaultBlogs);
      localStorage.setItem('amanexBlogs', JSON.stringify(defaultBlogs));
    }

    // Load saved admin password
    if (savedPassword) {
      setAdminPassword(savedPassword);
    }
  }, []);

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };

  const saveJobs = (newJobs: JobOpening[]) => {
    setJobs(newJobs);
    localStorage.setItem('amanexJobs', JSON.stringify(newJobs));
  };

  const saveBlogs = (newBlogs: BlogPost[]) => {
    setBlogPosts(newBlogs);
    localStorage.setItem('amanexBlogs', JSON.stringify(newBlogs));
  };

  const addJob = (job: Omit<JobOpening, 'id'>) => {
    const newJob = { ...job, id: Date.now() };
    saveJobs([...jobs, newJob]);
    setShowJobForm(false);
  };

  const updateJob = (updatedJob: JobOpening) => {
    const newJobs = jobs.map(job => job.id === updatedJob.id ? updatedJob : job);
    saveJobs(newJobs);
    setEditingJob(null);
  };

  const [showDeleteJobConfirm, setShowDeleteJobConfirm] = useState<number | null>(null);

  const deleteJob = (id: number) => {
    const newJobs = jobs.filter(job => job.id !== id);
    saveJobs(newJobs);
    setShowDeleteJobConfirm(null);
  };

  const addBlog = (blog: Omit<BlogPost, 'id'>) => {
    const newBlog = { ...blog, id: Date.now() };
    saveBlogs([...blogPosts, newBlog]);
    setShowBlogForm(false);
  };

  const updateBlog = (updatedBlog: BlogPost) => {
    const newBlogs = blogPosts.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog);
    saveBlogs(newBlogs);
    setEditingBlog(null);
  };

  const [showDeleteBlogConfirm, setShowDeleteBlogConfirm] = useState<number | null>(null);

  const deleteBlog = (id: number) => {
    const newBlogs = blogPosts.filter(blog => blog.id !== id);
    saveBlogs(newBlogs);
    setShowDeleteBlogConfirm(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-coty-navy">
                Admin Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button 
                  onClick={handleLogin}
                  className="w-full bg-coty-navy hover:bg-coty-navy/90"
                >
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <StandardHeader />
      
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-coty-navy mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Manage job openings, blog posts, and newsletter</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'jobs'
                    ? 'bg-coty-navy text-white shadow-md'
                    : 'text-gray-600 hover:text-coty-navy'
                }`}
              >
                <Briefcase className="inline w-5 h-5 mr-2" />
                Job Openings
              </button>
              <button
                onClick={() => setActiveTab('blog')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'blog'
                    ? 'bg-coty-navy text-white shadow-md'
                    : 'text-gray-600 hover:text-coty-navy'
                }`}
              >
                <FileText className="inline w-5 h-5 mr-2" />
                Blog Posts
              </button>
              <button
                onClick={() => setActiveTab('newsletter')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'newsletter'
                    ? 'bg-coty-navy text-white shadow-md'
                    : 'text-gray-600 hover:text-coty-navy'
                }`}
              >
                <Mail className="inline w-5 h-5 mr-2" />
                Newsletter
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'settings'
                    ? 'bg-coty-navy text-white shadow-md'
                    : 'text-gray-600 hover:text-coty-navy'
                }`}
              >
                <SettingsIcon className="inline w-5 h-5 mr-2" />
                Settings
              </button>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'jobs' ? (
            <JobManagement 
              jobs={jobs}
              onAdd={addJob}
              onUpdate={updateJob}
              onDelete={deleteJob}
              editingJob={editingJob}
              setEditingJob={setEditingJob}
              showForm={showJobForm}
              setShowForm={setShowJobForm}
            />
          ) : activeTab === 'blog' ? (
            <BlogManagement 
              blogPosts={blogPosts}
              onAdd={addBlog}
              onUpdate={updateBlog}
              onDelete={deleteBlog}
              editingBlog={editingBlog}
              setEditingBlog={setEditingBlog}
              showForm={showBlogForm}
              setShowForm={setShowBlogForm}
            />
          ) : activeTab === 'newsletter' ? (
            <NewsletterManagement />
          ) : (
            <Settings 
              adminPassword={adminPassword}
              setAdminPassword={setAdminPassword}
              showPasswordForm={showPasswordForm}
              setShowPasswordForm={setShowPasswordForm}
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              passwordMessage={passwordMessage}
              setPasswordMessage={setPasswordMessage}
            />
          )}
        </div>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

// Job Management Component
function JobManagement({ 
  jobs, 
  onAdd, 
  onUpdate, 
  onDelete, 
  editingJob, 
  setEditingJob, 
  showForm, 
  setShowForm 
}: {
  jobs: JobOpening[];
  onAdd: (job: Omit<JobOpening, 'id'>) => void;
  onUpdate: (job: JobOpening) => void;
  onDelete: (id: number) => void;
  editingJob: JobOpening | null;
  setEditingJob: (job: JobOpening | null) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    experience: '',
    description: '',
    requirements: '',
    responsibilities: ''
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        title: editingJob.title,
        department: editingJob.department,
        location: editingJob.location,
        type: editingJob.type,
        experience: editingJob.experience,
        description: editingJob.description,
        requirements: editingJob.requirements.join('\n'),
        responsibilities: editingJob.responsibilities.join('\n')
      });
    } else {
      setFormData({
        title: '',
        department: '',
        location: '',
        type: '',
        experience: '',
        description: '',
        requirements: '',
        responsibilities: ''
      });
    }
  }, [editingJob]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize all input fields
    const sanitizedData = {
      title: sanitizeInput(formData.title),
      department: sanitizeInput(formData.department),
      location: sanitizeInput(formData.location),
      type: sanitizeInput(formData.type),
      experience: sanitizeInput(formData.experience),
      description: sanitizeInput(formData.description),
      requirements: formData.requirements.split('\n').filter(r => sanitizeInput(r).trim()),
      responsibilities: formData.responsibilities.split('\n').filter(r => sanitizeInput(r).trim())
    };
    
    const jobData = {
      ...sanitizedData,
      requirements: sanitizedData.requirements.filter(r => r.trim()),
      responsibilities: sanitizedData.responsibilities.filter(r => r.trim())
    };

    if (editingJob) {
      onUpdate({ ...editingJob, ...jobData });
      setEditingJob(null);
      setShowForm(false);
    } else {
      onAdd(jobData);
      setFormData({
        title: '',
        department: '',
        location: '',
        type: '',
        experience: '',
        description: '',
        requirements: '',
        responsibilities: ''
      });
    }
  };

  return (
    <div>
      {/* Add Job Button */}
      <div className="mb-6">
        <Button 
          onClick={() => {
            setShowForm(true);
            setEditingJob(null);
            setFormData({
              title: '',
              department: '',
              location: '',
              type: '',
              experience: '',
              description: '',
              requirements: '',
              responsibilities: ''
            });
          }}
          className="bg-coty-navy hover:bg-coty-navy/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Job Opening
        </Button>
      </div>

      {/* Job Form */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingJob ? 'Edit Job Opening' : 'Add New Job Opening'}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setEditingJob(null);
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Job Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <Input
                  placeholder="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                />
                <Input
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  required
                />
                <Input
                  placeholder="Employment Type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                />
                <Input
                  placeholder="Experience Required"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  required
                />
              </div>
              
              <Textarea
                placeholder="Job Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={3}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements (one per line)
                </label>
                <Textarea
                  placeholder="Enter requirements, one per line"
                  value={formData.requirements}
                  onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                  required
                  rows={4}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsibilities (one per line)
                </label>
                <Textarea
                  placeholder="Enter responsibilities, one per line"
                  value={formData.responsibilities}
                  onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
                  required
                  rows={4}
                />
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="bg-coty-navy hover:bg-coty-navy/90">
                  <Save className="w-5 h-5 mr-2" />
                  {editingJob ? 'Update Job' : 'Add Job'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingJob(null);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-coty-navy mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {job.location}
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{job.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingJob(job);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(job.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {jobs.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No job openings yet. Add your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Blog Management Component
function BlogManagement({ 
  blogPosts, 
  onAdd, 
  onUpdate, 
  onDelete, 
  editingBlog, 
  setEditingBlog, 
  showForm, 
  setShowForm 
}: {
  blogPosts: BlogPost[];
  onAdd: (blog: Omit<BlogPost, 'id'>) => void;
  onUpdate: (blog: BlogPost) => void;
  onDelete: (id: number) => void;
  editingBlog: BlogPost | null;
  setEditingBlog: (blog: BlogPost | null) => void;
  showForm: boolean;
  setShowForm: (show: boolean) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    published: true
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  // Image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData({...formData, image: result});
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear image preview
  const clearImage = () => {
    setFormData({...formData, image: ''});
    setImagePreview('');
  };

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title,
        excerpt: editingBlog.excerpt,
        content: editingBlog.content,
        category: editingBlog.category,
        date: editingBlog.date,
        image: editingBlog.image,
        published: editingBlog.published
      });
      setImagePreview(editingBlog.image);
    } else {
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        published: true
      });
      setImagePreview('');
    }
  }, [editingBlog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBlog: BlogPost = {
      id: editingBlog ? editingBlog.id : Date.now(),
      title: sanitizeInput(formData.title),
      excerpt: sanitizeInput(formData.excerpt),
      content: sanitizeInput(formData.content),
      category: sanitizeInput(formData.category),
      date: formData.date,
      image: formData.image, // Keep image as is (base64 or URL)
      published: formData.published
    };

    if (editingBlog) {
      onUpdate(newBlog);
      setEditingBlog(null);
    } else {
      onAdd(newBlog);
    }

    setShowForm(false);
    resetForm(); // Reset form and image preview
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      image: '',
      published: false
    });
    setImagePreview('');
  };

  // Handle edit blog
  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      date: blog.date,
      image: blog.image,
      published: blog.published
    });
    setImagePreview(blog.image);
    setShowForm(true);
  };

  return (
    <div>
      {/* Add Blog Button */}
      <div className="mb-6">
        <Button 
          onClick={() => {
            setShowForm(true);
            setEditingBlog(null);
            setFormData({
              title: '',
              excerpt: '',
              content: '',
              category: '',
              date: new Date().toISOString().split('T')[0],
              image: '',
              published: true
            });
            setImagePreview('');
          }}
          className="bg-coty-navy hover:bg-coty-navy/90"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Blog Post
        </Button>
      </div>

      {/* Blog Form */}
      {showForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setEditingBlog(null);
                  resetForm(); // Reset form data and image preview
                }}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Blog Image
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Current Image Display (when editing) */}
                {!imagePreview && formData.image && editingBlog && (
                  <div className="relative inline-block">
                    <img 
                      src={formData.image} 
                      alt="Current Image" 
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <div className="text-xs text-gray-500 mt-1">Current image</div>
                  </div>
                )}

                {/* File Upload Input */}
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coty-navy file:text-white hover:file:bg-coty-navy/90 file:cursor-pointer"
                    required={!editingBlog}
                  />
                  {formData.image && !imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setImagePreview(formData.image)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  )}
                </div>
                
                {/* Fallback URL Input */}
                <div className="text-sm text-gray-500">
                  <p>Or enter an image URL:</p>
                  <Input
                    placeholder="Image URL (optional if uploading file)"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <Textarea
                placeholder="Blog Excerpt (short summary)"
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                required
                rows={2}
              />
              
              <Textarea
                placeholder="Blog Content (full article)"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                rows={8}
              />
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Publish immediately
                </label>
              </div>
              
              <div className="flex gap-4">
                <Button type="submit" className="bg-coty-navy hover:bg-coty-navy/90">
                  <Save className="w-5 h-5 mr-2" />
                  {editingBlog ? 'Update Blog' : 'Add Blog'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingBlog(null);
                    resetForm(); // Reset form data and image preview
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="space-y-4">
        {blogPosts.map((blog) => (
          <Card key={blog.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-coty-navy">{blog.title}</h3>
                    {blog.published ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {blog.category}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {blog.date}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{blog.excerpt}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBlog(blog)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(blog.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {blogPosts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No blog posts yet. Add your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Newsletter Management Component
function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load subscribers
    const loadedSubscribers = NewsletterService.getAllSubscribers();
    setSubscribers(loadedSubscribers);
    setLoading(false);

    // Listen for new subscriptions
    const handleNewSubscription = () => {
      const updatedSubscribers = NewsletterService.getAllSubscribers();
      setSubscribers(updatedSubscribers);
    };

    window.addEventListener('newsletterSubscribed', handleNewSubscription);
    
    // Also check periodically for updates (in case of subscriptions from other tabs)
    const interval = setInterval(() => {
      const updatedSubscribers = NewsletterService.getAllSubscribers();
      if (updatedSubscribers.length !== subscribers.length) {
        setSubscribers(updatedSubscribers);
      }
    }, 5000);

    return () => {
      window.removeEventListener('newsletterSubscribed', handleNewSubscription);
      clearInterval(interval);
    };
  }, [subscribers.length]);

  const handleExportCSV = () => {
    const csvContent = NewsletterService.exportToCSV(subscribers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'newsletter_subscribers.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-coty-navy mb-4">Newsletter Management</h2>
        <p className="text-gray-600">Manage your website newsletter</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Newsletter Subscribers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p><strong>Total Subscribers:</strong> {subscribers.length}</p>
              <div className="flex gap-2 mt-4">
                <Button 
                  className="bg-coty-navy hover:bg-coty-navy/90"
                  onClick={() => window.location.href = '/admin/newsletter-subscribers'}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Subscribers
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={handleExportCSV}
                  disabled={subscribers.length === 0}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export to CSV
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Send Newsletter</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Subject"
                required
              />
              <Textarea
                placeholder="Newsletter Content"
                required
                rows={10}
              />
              <Button className="bg-coty-navy hover:bg-coty-navy/90" disabled={subscribers.length === 0}>
                <Mail className="w-4 h-4 mr-2" />
                Send Newsletter ({subscribers.length} recipients)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Newsletter Templates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Total Templates:</strong> 0</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            <span>Newsletter Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-gray-600">
          <p><strong>Automated Emails:</strong> Disabled</p>
          <p><strong>Email Frequency:</strong> Weekly</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Component
function Settings({ 
  adminPassword, 
  setAdminPassword, 
  showPasswordForm, 
  setShowPasswordForm, 
  currentPassword, 
  setCurrentPassword, 
  newPassword, 
  setNewPassword, 
  confirmPassword, 
  setConfirmPassword, 
  passwordMessage, 
  setPasswordMessage 
}: {
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  showPasswordForm: boolean;
  setShowPasswordForm: (show: boolean) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  passwordMessage: string;
  setPasswordMessage: (message: string) => void;
}) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = () => {
    if (currentPassword === adminPassword) {
      if (newPassword === confirmPassword) {
        if (newPassword.length < 6) {
          setPasswordMessage('Password must be at least 6 characters long.');
          return;
        }
        setAdminPassword(newPassword);
        localStorage.setItem('amanexAdminPassword', newPassword);
        setPasswordMessage('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPasswordMessage(''), 3000);
      } else {
        setPasswordMessage('New password and confirm password do not match.');
        setTimeout(() => setPasswordMessage(''), 3000);
      }
    } else {
      setPasswordMessage('Current password is incorrect.');
      setTimeout(() => setPasswordMessage(''), 3000);
    }
  };

  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all content to defaults? This will remove all custom jobs and blog posts.')) {
      // Reset jobs to defaults
      const defaultJobs = [
        {
          id: 1,
          title: "Sales Representative",
          department: "Sales & Marketing",
          location: "Accra, Ghana",
          type: "Full-time",
          experience: "2-3 years",
          description: "We're looking for a dynamic Sales Representative to join our team and help drive growth in the Ghanaian market.",
          requirements: [
            "Bachelor's degree in Business, Marketing, or related field",
            "2-3 years of sales experience in FMCG industry",
            "Strong communication and negotiation skills",
            "Proven track record of meeting sales targets",
            "Knowledge of the local market and consumer behavior"
          ],
          responsibilities: [
            "Develop and maintain relationships with key clients",
            "Achieve monthly and quarterly sales targets",
            "Conduct market research and competitor analysis",
            "Present product demonstrations and training sessions",
            "Prepare sales reports and forecasts"
          ]
        },
        {
          id: 2,
          title: "Marketing Coordinator",
          department: "Marketing",
          location: "Accra, Ghana",
          type: "Full-time",
          experience: "1-2 years",
          description: "Join our marketing team to help create compelling campaigns that connect with our customers.",
          requirements: [
            "Bachelor's degree in Marketing, Communications, or related field",
            "1-2 years of marketing experience",
            "Proficiency in digital marketing tools and platforms",
            "Creative thinking and problem-solving skills",
            "Experience with social media management"
          ],
          responsibilities: [
            "Assist in developing marketing campaigns and strategies",
            "Manage social media accounts and content creation",
            "Coordinate with external agencies and vendors",
            "Track and analyze campaign performance metrics",
            "Support event planning and execution"
          ]
        }
      ];

      // Reset blogs to defaults
      const defaultBlogs = [
        {
          id: 1,
          title: "Amanex Ghana: Pioneering Personal Care Excellence in West Africa",
          excerpt: "Discover how Amanex Ghana has become a leading force in personal care and home care products, bringing premium quality and innovative solutions to homes across West Africa.",
          content: "In the heart of West Africa, Amanex Ghana has emerged as a beacon of excellence in personal care and home care products. Since our establishment, we've been committed to transforming everyday routines into luxurious experiences, one product at a time. Our journey from a local startup to a trusted household name reflects our unwavering dedication to quality, innovation, and customer satisfaction.",
          category: "Company News",
          date: "2025-01-15",
          image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          published: true
        }
      ];

      localStorage.setItem('amanexJobs', JSON.stringify(defaultJobs));
      localStorage.setItem('amanexBlogs', JSON.stringify(defaultBlogs));
      
      // Reset password to default
      setAdminPassword('amanex2025');
      localStorage.setItem('amanexAdminPassword', 'amanex2025');
      
      setPasswordMessage('All content has been reset to defaults. Please refresh the page.');
      setTimeout(() => setPasswordMessage(''), 5000);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-coty-navy mb-4">Admin Settings</h2>
        <p className="text-gray-600">Manage your admin password and system settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Password Management */}
        <div>
          <h3 className="text-xl font-semibold text-coty-navy mb-4">Password Management</h3>
          
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Change Admin Password</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <Input
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <Input
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder="Enter new password (min 6 characters)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="mt-1"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="mt-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              
              <Button 
                onClick={handlePasswordChange}
                className="w-full bg-coty-navy hover:bg-coty-navy/90"
              >
                <Save className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* System Settings */}
        <div>
          <h3 className="text-xl font-semibold text-coty-navy mb-4">System Settings</h3>
          
          <Card className="mb-4">
            <CardHeader>
              <CardTitle className="text-lg">Reset to Defaults</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                This will reset all jobs, blog posts, and admin password to their default values. 
                <strong>This action cannot be undone.</strong>
              </p>
              <Button 
                onClick={resetToDefaults}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                Reset All Content to Defaults
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current System Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p><strong>Admin Password:</strong> {adminPassword === 'amanex2025' ? 'Default' : 'Custom'}</p>
              <p><strong>Data Storage:</strong> Browser Local Storage</p>
              <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {passwordMessage && (
        <div className={`mt-6 p-4 rounded-lg ${
          passwordMessage.includes('successfully') || passwordMessage.includes('reset') 
            ? 'bg-green-50 border border-green-200 text-green-700' 
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          <p className="font-medium">{passwordMessage}</p>
        </div>
      )}
    </div>
  );
}
