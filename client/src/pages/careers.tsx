import { useState, useEffect, useRef } from "react";
import { Search, Menu, ArrowRight, X, Phone, Mail, MapPin, Clock, Users, Globe, ArrowUp, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import StandardHeader from "@/components/StandardHeader";
import ScrollToTop from "@/components/ScrollToTop";

import { JobService } from "@/services/jobService";

export default function Careers() {
  const [isBenefitsVisible, setIsBenefitsVisible] = useState(false);
  const [isJobsVisible, setIsJobsVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [jobOpenings, setJobOpenings] = useState<any[]>([]);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const jobsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [loadingJobs, setLoadingJobs] = useState(true);

  const [error, setError] = useState("");


  // Default job openings data
  // const defaultJobs = [
  //   {
  //     id: 1,
  //     title: "Sales Representative",
  //     department: "Sales & Marketing",
  //     location: "Accra, Ghana",
  //     type: "Full-time",
  //     experience: "2-3 years",
  //     description: "We're looking for a dynamic Sales Representative to join our team and help drive growth in the Ghanaian market.",
  //     requirements: [
  //       "Bachelor's degree in Business, Marketing, or related field",
  //       "2-3 years of sales experience in FMCG industry",
  //       "Strong communication and negotiation skills",
  //       "Proven track record of meeting sales targets",
  //       "Knowledge of the local market and consumer behavior"
  //     ],
  //     responsibilities: [
  //       "Develop and maintain relationships with key clients",
  //       "Achieve monthly and quarterly sales targets",
  //       "Conduct market research and competitor analysis",
  //       "Present product demonstrations and training sessions",
  //       "Prepare sales reports and forecasts"
  //     ]
  //   },
  //   {
  //     id: 2,
  //     title: "Marketing Coordinator",
  //     department: "Marketing",
  //     location: "Accra, Ghana",
  //     type: "Full-time",
  //     experience: "1-2 years",
  //     description: "Join our marketing team to help create compelling campaigns that connect with our customers.",
  //     requirements: [
  //       "Bachelor's degree in Marketing, Communications, or related field",
  //       "1-2 years of marketing experience",
  //       "Proficiency in digital marketing tools and platforms",
  //       "Creative thinking and problem-solving skills",
  //       "Experience with social media management"
  //     ],
  //     responsibilities: [
  //       "Assist in developing marketing campaigns and strategies",
  //       "Manage social media accounts and content creation",
  //       "Coordinate with external agencies and vendors",
  //       "Track and analyze campaign performance metrics",
  //       "Support event planning and execution"
  //     ]
  //   },
  //   {
  //     id: 3,
  //     title: "Supply Chain Specialist",
  //     department: "Operations",
  //     location: "Accra, Ghana",
  //     type: "Full-time",
  //     experience: "3-5 years",
  //     description: "Help optimize our supply chain operations to ensure efficient product distribution across Ghana.",
  //     requirements: [
  //       "Bachelor's degree in Supply Chain Management, Logistics, or related field",
  //       "3-5 years of supply chain experience",
  //       "Knowledge of inventory management systems",
  //       "Strong analytical and problem-solving skills",
  //       "Experience with ERP systems"
  //     ],
  //     responsibilities: [
  //       "Manage inventory levels and forecasting",
  //       "Coordinate with suppliers and logistics partners",
  //       "Optimize warehouse operations and distribution",
  //       "Monitor and improve supply chain performance",
  //       "Ensure compliance with quality standards"
  //     ]
  //   },
  //   {
  //     id: 4,
  //     title: "Customer Service Representative",
  //     department: "Customer Service",
  //     location: "Accra, Ghana",
  //     type: "Full-time",
  //     experience: "1-2 years",
  //     description: "Be the voice of our company and help deliver exceptional customer experiences.",
  //     requirements: [
  //       "High school diploma or equivalent",
  //       "1-2 years of customer service experience",
  //       "Excellent communication skills in English and local languages",
  //       "Patient and empathetic approach to customer issues",
  //       "Ability to work in shifts"
  //     ],
  //     responsibilities: [
  //       "Handle customer inquiries and complaints",
  //       "Process orders and track shipments",
  //       "Provide product information and support",
  //       "Maintain customer records and update databases",
  //       "Escalate complex issues to appropriate departments"
  //     ]
  //   }
  // ];

  // Load job openings from localStorage or use defaults
  // useEffect(() => {
  //   const savedJobs = localStorage.getItem('amanexJobs');
  //   if (savedJobs && JSON.parse(savedJobs).length > 0) {
  //     setJobOpenings(JSON.parse(savedJobs));
  //   } else {
  //     setJobOpenings(defaultJobs);
  //   }
  // }, []);

  useEffect(() => {
    JobService.getAll().then((res) => {
      const formattedJobs = res.data
        .filter((job: any) => job.is_open)
        .map((job: any) => ({
          ...job,
          type: job.job_type === "full_time" ? "Full-time" : "Part-time",
          requirements: job.requirements
          .split("\r\n")
          .filter((line: string) => line.trim() !== ""),
          responsibilities: job.responsibilities
          .split("\r\n")
          .filter((line: string) => line.trim() !== ""),        
        }));
  
      setJobOpenings(formattedJobs);
    })
    .catch(() => {
      setError("Failed to load categories");
    })
    .finally(() => setLoadingJobs(false));
  }, []);
  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === benefitsRef.current) {
              setIsBenefitsVisible(true);
              setActiveSection("benefits");
            } else if (entry.target === jobsRef.current) {
              setIsJobsVisible(true);
              setActiveSection("jobs");
            } else if (entry.target === formRef.current) {
              setActiveSection("form");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }
    if (jobsRef.current) {
      observer.observe(jobsRef.current);
    }
    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToForm = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setActiveSection("form");
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    
    // Store application in localStorage
    const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
    const newApplication = {
      id: Date.now(),
      ...data,
      position: selectedJob,
      timestamp: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem('jobApplications', JSON.stringify(applications));
    
    // Show success message
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedJob("");
      (e.target as HTMLFormElement).reset();
    }, 5000);
  };

  const benefits = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Professional Growth",
      description: "Continuous learning opportunities and career development programs",
      color: "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Global Exposure",
      description: "Work with international brands and gain valuable experience",
      color: "bg-green-100 text-green-600 group-hover:bg-green-200"
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: "Competitive Benefits",
      description: "Health insurance, paid time off, and performance bonuses",
      color: "bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Work-Life Balance",
      description: "Flexible working hours and supportive work environment",
      color: "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
    }
  ];

  return (
    <div className="min-h-screen">
      <StandardHeader />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen">
          <div className="text-center w-full">
            {/* Main Heading with Enhanced Typography */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-coty-navy leading-tight mb-4">
                CAREERS
              </h1>
              <div className="w-24 h-1 bg-coty-navy mx-auto rounded-full"></div>
            </div>
            
            {/* Enhanced Description */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
              Join our dynamic team and be part of a company that's shaping the future of manufacturing in Ghana. 
              Discover opportunities that match your skills and passion.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                onClick={() => {
                  jobsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection("jobs");
                }}
                className="w-fit flex items-center gap-4 px-8 py-4 bg-coty-navy text-white text-lg font-medium rounded-br-3xl hover:bg-transparent hover:text-coty-navy border-2 border-coty-navy transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                VIEW OPENINGS
                <ArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button 
                onClick={() => {
                  benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection("benefits");
                }}
                className="w-fit flex items-center gap-4 px-8 py-4 bg-transparent text-coty-navy text-lg font-medium rounded-br-3xl hover:bg-coty-navy hover:text-white border-2 border-coty-navy transition-all duration-300 hover:scale-105"
              >
                LEARN MORE
                <ArrowUp className="text-xl" />
              </Button>
            </div>
            
            {/* Enhanced Scroll Indicator */}
            <div className="mt-8 text-gray-500 font-medium flex items-center justify-center">
              <div className="w-8 h-px bg-gray-500 mr-3 animate-pulse"></div>
              <span className="text-sm tracking-wide animate-bounce">EXPLORE OPPORTUNITIES</span>
              <div className="w-8 h-px bg-gray-500 ml-3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Menu */}
      <section className="py-8 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-500 font-medium">Quick Navigation</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => {
                benefitsRef.current?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection("benefits");
              }}
              className={`px-6 py-3 font-medium rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                activeSection === "benefits" 
                  ? "bg-coty-navy text-white border-coty-navy shadow-lg" 
                  : "text-coty-navy border-coty-navy hover:bg-coty-navy hover:text-white hover:shadow-md"
              }`}
            >
              Why Work With Us
            </button>
            <button 
              onClick={() => {
                jobsRef.current?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection("jobs");
              }}
              className={`px-6 py-3 font-medium rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                activeSection === "jobs" 
                  ? "bg-coty-navy text-white border-coty-navy shadow-lg" 
                  : "text-coty-navy border-coty-navy hover:bg-coty-navy hover:text-white hover:shadow-md"
              }`}
            >
              Job Openings
            </button>
            <button 
              onClick={() => {
                formRef.current?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection("form");
              }}
              className={`px-6 py-3 font-medium rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                activeSection === "form" 
                  ? "bg-coty-navy text-white border-coty-navy shadow-lg" 
                  : "text-coty-navy border-coty-navy hover:bg-coty-navy hover:text-white hover:shadow-md"
              }`}
            >
              Apply Now
            </button>
          </nav>
        </div>
      </section>

      {/* Company Culture Section */}
      <section ref={benefitsRef} className="py-20 bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-6">Why Work With Us?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating an environment where our employees can thrive, grow, and make a meaningful impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ease-out ${
                  isBenefitsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  minHeight: '280px'
                }}
              >
                <Card className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 border-2 border-transparent hover:border-coty-navy/20 group h-full">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full transition-all duration-300 group-hover:scale-110 transform ${benefit.color}`}>
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-medium text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{benefit.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Job Openings Section */}
      <section ref={jobsRef} className="py-20">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-coty-navy mb-6">Current Openings</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our current job opportunities and find the perfect role for your career growth.
            </p>
          </div>

          {loadingJobs && <p className="text-center text-gray-500">Loading job openings...</p>}

          {!loadingJobs && jobOpenings.length === 0 && (
            <p className="text-center text-gray-500">
              No job openings at the moment. Please check back later.
            </p>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          
          <div className="space-y-8">
            {jobOpenings.map((job, index) => (
              <div
                key={job.id}
                className={`transform transition-all duration-700 ease-out ${
                  isJobsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-2 border-transparent hover:border-coty-navy/20 group">
                  <CardContent className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-coty-navy mb-2 group-hover:text-coty-navy/80 transition-colors duration-300">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1 group-hover:text-gray-700 transition-colors duration-200">
                            <div className="p-1.5 rounded-full bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform duration-200">
                              <Briefcase className="h-4 w-4" />
                            </div>
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-gray-700 transition-colors duration-200">
                            <div className="p-1.5 rounded-full bg-green-100 text-green-600 group-hover:scale-110 transition-transform duration-200">
                              <MapPin className="h-4 w-4" />
                            </div>
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-gray-700 transition-colors duration-200">
                            <div className="p-1.5 rounded-full bg-yellow-100 text-yellow-600 group-hover:scale-110 transition-transform duration-200">
                              <Clock className="h-4 w-4" />
                            </div>
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1 group-hover:text-gray-700 transition-colors duration-200">
                            <div className="p-1.5 rounded-full bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform duration-200">
                              <Users className="h-4 w-4" />
                            </div>
                            {job.experience} experience
                          </span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => scrollToForm(job.title)}
                        className="w-fit flex items-center gap-4 px-6 py-3 bg-coty-navy text-white text-sm font-medium rounded-br-3xl hover:bg-coty-mint hover:text-coty-navy border border-coty-navy transition-all duration-300 mt-4 lg:mt-0 hover:scale-105 group-hover:shadow-lg shadow-md"
                      >
                        APPLY NOW
                        <ArrowRight className="text-xl group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                    
                    <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">{job.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-medium text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">Requirements:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req: string, reqIndex: number) => (
                            <li key={reqIndex} className="flex items-start gap-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                              <span className="text-coty-navy mt-1 group-hover:scale-110 transition-transform duration-200">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-coty-navy mb-3 group-hover:text-coty-navy/80 transition-colors duration-300">Responsibilities:</h4>
                        <ul className="space-y-2">
                          {job.responsibilities.map((resp: string, respIndex: number) => (
                            <li key={respIndex} className="flex items-start gap-2 text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                              <span className="text-coty-navy mt-1 group-hover:scale-110 transition-transform duration-200">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section ref={formRef} className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-coty-navy mb-6">Apply Now</h2>
            <p className="text-xl text-gray-600">
              Ready to join our team? Submit your application and we'll get back to you soon.
            </p>
            {selectedJob && (
              <div className="mt-4 p-4 bg-coty-navy/10 border border-coty-navy/20 rounded-lg">
                <p className="text-coty-navy font-medium">
                  Applying for: <span className="font-bold">{selectedJob}</span>
                </p>
              </div>
            )}
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-coty-navy mb-2">Application Submitted!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your interest in joining our team. Your application has been saved successfully.
                  </p>
                  <p className="text-sm text-gray-500">
                    We'll review your application and get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                      <Input type="text" name="firstName" required className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                      <Input type="text" name="lastName" required className="w-full" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input type="email" name="email" required className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                      <Input type="tel" name="phone" required className="w-full" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position Applied For *</label>
                    <select 
                      name="position" 
                      value={selectedJob}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coty-navy focus:border-transparent"
                    >
                      <option value="">Select a position</option>
                      {jobOpenings.map((job) => (
                        <option key={job.id} value={job.title}>{job.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
                    <Textarea 
                      name="coverLetter"
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      className="w-full min-h-[120px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume/CV *</label>
                    <Input type="file" name="resume" accept=".pdf,.doc,.docx" required className="w-full" />
                    <p className="text-sm text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                  
                  <Button type="submit" className="w-full flex items-center justify-center gap-4 px-8 py-4 bg-coty-navy text-white text-lg font-medium rounded-br-3xl hover:bg-transparent hover:text-coty-navy border border-coty-navy transition-colors duration-300">
                    SUBMIT APPLICATION
                    <ArrowRight className="text-2xl" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}