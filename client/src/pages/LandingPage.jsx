// import React, { useState } from "react";
// import ReactMarkdown from "react-markdown";

// import {
//   Upload,
//   FileText,
//   Sparkles,
//   Clock,
//   Target,
//   TrendingUp,
//   Shield,
//   Github,
//   Linkedin,
// } from "lucide-react";

// export default function LandingPage() {
//   const [jobDescription, setJobDescription] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [suggestions, setSuggestions] = useState("");
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   const handleGenerate = async () => {
//     if (!resumeFile || !jobDescription.trim()) {
//       setError("Please upload a resume and paste a job description.");
//       return;
//     }

//     setLoading(true);
//     setSuggestions("");
//     setError("");

//     try {
//       const formData = new FormData();
//       formData.append("resume", resumeFile);
//       formData.append("jobDescription", jobDescription);

//       const response = await fetch(
//         "http://localhost:5000/api/generate-suggestions",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const text = await response.text(); // Read raw response for logging/debugging
//       console.log("Raw response body:", text);

//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (e) {
//         console.error("❌ Failed to parse JSON:", e);
//         throw new Error("Invalid response from server.");
//       }

//       if (!response.ok) {
//         throw new Error(data?.message || `Error: ${response.status}`);
//       }

//       setSuggestions(data.suggestions || "No suggestions received.");
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <FileText className="h-8 w-8 text-blue-600 mr-2" />
//               <span className="text-xl font-bold text-gray-900">
//                 ResumeTailor
//               </span>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#home" className="text-gray-700 hover:text-blue-600">
//                 Home
//               </a>
//               <a href="#about" className="text-gray-700 hover:text-blue-600">
//                 About
//               </a>
//               <a href="https://github.com/Sahil-2005" className="text-gray-700 hover:text-blue-600">
//                 GitHub
//               </a>
//               <a
//                 href="#try-now"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//               >
//                 Try Now
//               </a>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
//           <div className="text-center lg:text-left">
//             <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
//               Tailor Your Resume for Any Job{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                 Instatly with AI
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600 mb-8">
//               Upload your resume, paste a job description, and get smart
//               suggestions to boost your application.
//             </p>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg">
//               Get Started
//             </button>
//           </div>
//           <div className="flex justify-center lg:justify-end">
//             <div className="relative">
//               <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
//                 <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
//                   <Sparkles className="h-24 w-24 text-blue-600" />
//                 </div>
//               </div>
//               <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
//                 <FileText className="h-8 w-8 text-white" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//               How It Works
//             </h2>
//             <p className="text-xl text-gray-600">
//               Three simple steps to optimize your resume
//             </p>
//           </div>
//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 Icon: Upload,
//                 title: "Step 1: Upload Resume",
//                 desc: "Upload your current resume in PDF or Word format",
//                 color: "bg-blue-100 text-blue-600",
//               },
//               {
//                 Icon: FileText,
//                 title: "Step 2: Paste Job Description",
//                 desc: "Copy and paste the job description you're applying for",
//                 color: "bg-green-100 text-green-600",
//               },
//               {
//                 Icon: Sparkles,
//                 title: "Step 3: Get AI Suggestions",
//                 desc: "Receive personalized recommendations to improve your resume",
//                 color: "bg-purple-100 text-purple-600",
//               },
//             ].map((item, i) => (
//               <div
//                 key={i}
//                 className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm rounded-xl"
//               >
//                 <div
//                   className={`w-16 h-16 ${
//                     item.color.split(" ")[0]
//                   } rounded-full flex items-center justify-center mx-auto mb-6`}
//                 >
//                   <item.Icon
//                     className={`h-8 w-8 ${item.color.split(" ")[1]}`}
//                   />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-3">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Why Use ResumeTailor Section */}
//       <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
//               Why Use ResumeTailor?
//             </h2>
//             <p className="text-xl text-gray-600">
//               Maximize your job application success
//             </p>
//           </div>
//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {[
//               {
//                 icon: Clock,
//                 title: "Save Hours of Manual Editing",
//                 desc: "Let AI do the heavy lifting while you focus on applying",
//                 bg: "bg-blue-100",
//                 text: "text-blue-600",
//               },
//               {
//                 icon: Target,
//                 title: "Align with Job Keywords Automatically",
//                 desc: "Match your resume to job requirements seamlessly",
//                 bg: "bg-green-100",
//                 text: "text-green-600",
//               },
//               {
//                 icon: TrendingUp,
//                 title: "Boost Your ATS Score",
//                 desc: "Optimize for applicant tracking systems",
//                 bg: "bg-purple-100",
//                 text: "text-purple-600",
//               },
//               {
//                 icon: Shield,
//                 title: "Sound More Confident and Professional",
//                 desc: "Enhance your professional presentation",
//                 bg: "bg-orange-100",
//                 text: "text-orange-600",
//               },
//             ].map((item, i) => (
//               <div key={i} className="text-center">
//                 <div
//                   className={`w-16 h-16 ${item.bg} rounded-full flex items-center justify-center mx-auto mb-6`}
//                 >
//                   <item.icon className={`h-8 w-8 ${item.text}`} />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3">
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Try It Now Section */}
//       <section
//         id="try-now"
//         className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50"
//       >
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-12">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Start Optimizing
//             </h2>
//             <p className="text-xl text-gray-600">
//               Upload your resume and job description to get started
//             </p>
//           </div>
//           <div className="p-8 shadow-2xl rounded-xl bg-white/80 backdrop-blur-sm space-y-6">
//             {/* File Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Upload Your Resume
//               </label>
//               <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer block">
//                 <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-600">
//                   {resumeFile
//                     ? resumeFile.name
//                     : "Click to upload or drag and drop"}
//                 </p>
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//                 <p className="text-sm text-gray-500 mt-2">
//                   PDF, DOC, or DOCX (max 10MB)
//                 </p>
//               </label>
//             </div>

//             {/* Job Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Job Description
//               </label>
//               <textarea
//                 placeholder="Paste the job description here..."
//                 value={jobDescription}
//                 onChange={(e) => setJobDescription(e.target.value)}
//                 className="w-full min-h-32 resize-none border border-gray-300 rounded-lg p-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//               />
//             </div>

//             {/* Error/Status */}
//             {error && <p className="text-red-600">{error}</p>}
//             {loading && (
//               <p className="text-blue-600">Generating suggestions...</p>
//             )}

//             {/* Submit */}
//             <button
//               onClick={handleGenerate}
//               disabled={loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-xl shadow-lg"
//             >
//               {loading ? "Processing..." : "Generate Suggestions"}
//             </button>
//           </div>
//           {/* Results */}
//           {suggestions && (
//             <div className="mt-10 px-6 py-8 bg-white border border-blue-300 rounded-2xl shadow-md transition-all duration-300">
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="text-3xl">💡</span>
//                 <h3 className="text-2xl font-bold text-blue-800">
//                   Tailored AI Suggestions
//                 </h3>
//               </div>

//               <ReactMarkdown
//                 components={{
//                   p: ({ node, ...props }) => (
//                     <p
//                       className="mb-4 text-gray-800 leading-relaxed text-base"
//                       {...props}
//                     />
//                   ),
//                   ul: ({ node, ...props }) => (
//                     <ul
//                       className="list-disc ml-6 space-y-4 text-gray-900"
//                       {...props}
//                     />
//                   ),
//                   li: ({ node, ...props }) => (
//                     <li className="text-base leading-relaxed" {...props} />
//                   ),
//                   strong: ({ node, ...props }) => (
//                     <strong
//                       className="font-semibold text-blue-900"
//                       {...props}
//                     />
//                   ),
//                   em: ({ node, ...props }) => (
//                     <em className="italic text-blue-700" {...props} />
//                   ),
//                 }}
//               >
//                 {suggestions}
//               </ReactMarkdown>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-white border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
//           <div className="text-gray-600 mb-4 md:mb-0">
//             © 2025 ResumeTailor. Built by Sahil.
//           </div>
//           <div className="flex items-center space-x-6">
//             <a href="https://github.com/Sahil-2005" className="text-gray-600 hover:text-blue-600">
//               <Github className="h-5 w-5" />
//             </a>
//             {/* <a href="#" className="text-gray-600 hover:text-blue-600">
//               <Linkedin className="h-5 w-5" />
//             </a> */}
//             <a href="#" className="text-gray-600 hover:text-blue-600">
//               Terms
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Upload,
  FileText,
  Sparkles,
  Clock,
  Target,
  TrendingUp,
  Shield,
  Github,
} from "lucide-react";

export default function LandingPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply theme class to <html> tag
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleFileChange = (e) => setResumeFile(e.target.files[0]);

  const handleGenerate = async () => {
    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume and paste a job description.");
      return;
    }

    setLoading(true);
    setSuggestions("");
    setError("");

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const response = await fetch("http://localhost:5000/api/generate-suggestions", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!response.ok) throw new Error(data?.message || `Error: ${response.status}`);
      setSuggestions(data.suggestions || "No suggestions received.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-xl font-bold">ResumeTailor</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#home" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </a>
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400">
                About
              </a>
              <a href="https://github.com/Sahil-2005" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400">
                GitHub
              </a>
              <a href="#try-now" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Try Now
              </a>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="ml-4 border px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDarkMode ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Tailor Your Resume for Any Job{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Instantly with AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Upload your resume, paste a job description, and get smart suggestions to boost your application.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg">
              Get Started
            </button>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Sparkles className="h-24 w-24 text-blue-600" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <FileText className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/60 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Three simple steps to optimize your resume
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[Upload, FileText, Sparkles].map((Icon, i) => (
              <div key={i} className="text-center p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {["Upload Resume", "Paste Job Description", "Get AI Suggestions"][i]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {[
                    "Upload your current resume in PDF or Word format",
                    "Paste the job description you're applying for",
                    "Receive AI-driven improvement suggestions",
                  ][i]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Now */}
      <section id="try-now" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Start Optimizing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Upload your resume and job description to get started
            </p>
          </div>
          <div className="p-8 shadow-2xl rounded-xl bg-white dark:bg-gray-900 border dark:border-gray-700 space-y-6">
            {/* Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">Upload Your Resume</label>
              <label className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer block">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {resumeFile ? resumeFile.name : "Click to upload or drag and drop"}
                </p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full min-h-32 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Error/Status */}
            {error && <p className="text-red-600 dark:text-red-400">{error}</p>}
            {loading && <p className="text-blue-600">Generating suggestions...</p>}

            {/* Submit */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg rounded-xl shadow-lg"
            >
              {loading ? "Processing..." : "Generate Suggestions"}
            </button>
          </div>

          {/* Results */}
          {suggestions && (
            <div className="mt-10 px-6 py-8 bg-white dark:bg-gray-900 border border-blue-300 dark:border-blue-700 rounded-2xl shadow-md">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">💡</span>
                <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-400">Tailored AI Suggestions</h3>
              </div>
              <ReactMarkdown
                components={{
                  p: ({ ...props }) => (
                    <p className="mb-4 text-gray-800 dark:text-gray-300 leading-relaxed text-base" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="list-disc ml-6 space-y-4 text-gray-900 dark:text-gray-200" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="text-base leading-relaxed" {...props} />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="font-semibold text-blue-900 dark:text-blue-400" {...props} />
                  ),
                  em: ({ ...props }) => (
                    <em className="italic text-blue-700 dark:text-blue-400" {...props} />
                  ),
                }}
              >
                {suggestions}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            © 2025 ResumeTailor. Built by Sahil.
          </div>
          <div className="flex items-center space-x-6">
            <a href="https://github.com/Sahil-2005" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
