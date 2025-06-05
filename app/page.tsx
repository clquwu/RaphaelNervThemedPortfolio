"use client"

import { useState, useEffect } from "react"
import { Terminal, Code, Github, Cpu, FileCode, Hexagon, Linkedin } from "lucide-react" // Added Linkedin
import { Button } from "@/components/ui/button"
import NervTerminal from "@/components/nerv-terminal"
import NervLogo from "@/components/nerv-logo"
import ProjectCard from "@/components/project-card"
import GithubRepo from "@/components/github-repo"
import TitleCard from "@/components/title-card"
import EnhancedBootSequence from "@/components/enhanced-boot-sequence"
import MagiSystemStatus from "@/components/magi-system-status"

export default function Portfolio() {
  const [bootSequenceComplete, setBootSequenceComplete] = useState(false)
  const [showTitleCard, setShowTitleCard] = useState(true)
  const [contact, setContact] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<null | "success" | "error">(null)

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setSent(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contact.name,
          email: contact.email,
          message: contact.message,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }

      setSent("success")
      setContact({ name: "", email: "", message: "" })
    } catch (error) {
      console.error('Contact form error:', error)
      setSent("error")
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    // Show title card first
    setTimeout(() => {
      setShowTitleCard(false)
    }, 2000)
  }, [])

  // Main featured projects
  const mainProjects = [
    {
      id: "PROJECT-01",
      title: "Scoreflow",
      description:
        "Innovative AI-powered web platform that transforms musical scores into MIDI and MusicXML formats. Developed with React and Next.js, this application revolutionizes sheet music digitization by offering precise and fast conversion using advanced AI algorithms for musical notation recognition.",
      technologies: ["React", "Next.js", "AI/ML", "JavaScript"],
      image: "/scroreflowbanner.png",
      demo: "https://scoreflow.app/",
      featured: true,
    },
    {
      id: "PROJECT-02",
      title: "Kibo Anime",
      description:
        "Innovative Android streaming application integrating multiple anime sources with a custom video player. Solo-developed with Kotlin and Jetpack Compose, featuring intelligent notifications, integrated downloads, TV casting, and recommendation system with Firebase real-time data management.",
      technologies: ["Kotlin", "Jetpack Compose", "Firebase", "ExoPlayer"],
      image: "/bannerkibo.png",
      demo: "https://www.kiboanime.app/",
      featured: true,
    },
    {
      id: "PROJECT-03",
      title: "PianoSync",
      description:
        "Interactive Android piano learning application that allows playing any MIDI file with your piano. Features falling notes towards a virtual keyboard and innovative functionalities for an immersive piano learning experience. Future iOS version planned.",
      technologies: ["Android", "Kotlin", "MIDI Processing", "Interactive UI"],
      image: "/pianosyncbanner.png",
      github: "https://github.com/clquwu/PianoSync",
      demo: "https://github.com/clquwu/PianoSync",
      featured: true,
    },
  ]

  // Additional GitHub projects (keeping some examples)
  const githubProjects = [
    {
      name: "Ftp Video Compressor",
      description: "Connect to an FTP server and compress videos using FFmpeg usiong VMAF optimized settings and AV1 codec.",
      language: "Python",
      stars: 0,
      forks: 0,
      url: "https://github.com/clquwu/FtpVideoCompressor",
    },
    {
      name: "Sibnet Url To Mp4",
      description: "Convert Sibnet URLs to direct MP4 links for easy video access.",
      language: "JavaScript",
      stars: 1,
      forks: 1,
      url: "https://github.com/clquwu/sibneturltomp4",
    },
    {
      name: "Python Fast Api Gptq Models",
      description: "FastAPI server for serving GPTQ quantized models with GPU support.",
      language: "Python",
      stars: 0,
      forks: 0,
      url: "https://github.com/clquwu/Python-FastApi-Dolphin2.6-GPTQ",
    },
    {
      name: "PianoSync",
      description: "Android piano learning app with MIDI support and interactive falling notes.",
      language: "Kotlin",
      stars: 3,
      forks: 0,
      url: "https://github.com/clquwu/PianoSync",
    },
  ]

  if (showTitleCard) {
    return <TitleCard />
  }

  if (!bootSequenceComplete) {
    return <EnhancedBootSequence onComplete={() => setBootSequenceComplete(true)} />
  }

  return (
    <div className="min-h-screen bg-nerv-black text-nerv-light relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 z-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-nerv-black via-nerv-black/90 to-nerv-black"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-nerv-black/90 border-b border-nerv-red/50 z-50">
        <div className="container mx-auto px-4 py-3 relative">
          <div className="flex items-center justify-between">
            {/* Logo and Name (left) */}
            <div className="flex items-center">
              <NervLogo className="w-8 h-8 mr-3" />
              <div className="eva-nerv-logo text-xl">RAPHAEL BOULLAY--LE FUR</div>
            </div>
            {/* Status (right) */}
            <div className="flex items-center">
              <div className="text-xs px-3 py-1 bg-nerv-red/20 border border-nerv-red/40 rounded nerv-tech">
                <span className="text-nerv-red">STATUS:</span>{" "}
                <span className="text-nerv-light">STUDENT</span>
              </div>
            </div>
            {/* Navigation (center, absolute) */}
            <div className="hidden md:flex items-center space-x-6 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <a href="#projects" className="nerv-ui text-nerv-light hover:text-nerv-red transition-colors">
                PROJECTS
              </a>
              <a href="#repositories" className="nerv-ui text-nerv-light hover:text-nerv-red transition-colors">
                REPOSITORIES
              </a>
              <a href="#about" className="nerv-ui text-nerv-light hover:text-nerv-red transition-colors">
                ABOUT
              </a>
              <a href="#contact" className="nerv-ui text-nerv-light hover:text-nerv-red transition-colors">
                CONTACT
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto">
          {/* Hero Section */}
          <section className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="eva-brackets nerv-ui text-nerv-red text-sm tracking-wider">
                    UNIVERSITY OF BORDEAUX - COMPUTER SCIENCE
                  </div>
                  <h1 className="eva-main-title text-5xl lg:text-7xl leading-tight">
                    <span>MOBILE &</span>
                    <br />
                    <span className="text-nerv-red">WEB DEVELOPER</span>
                  </h1>
                  <p className="text-xl text-nerv-light/80 max-w-lg eva-subtitle">
                    First-year Computer Science student at University of Bordeaux, passionate about software development.
                    Strong skills in Android mobile development (Kotlin/Jetpack Compose) and web development (React/Next.js).
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="bg-nerv-red hover:bg-nerv-red/80 text-white px-8 py-3 nerv-ui"
                    onClick={() => {
                      const section = document.getElementById("projects");
                      if (section) section.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    VIEW PROJECTS
                  </Button>
                  <Button
                    variant="outline"
                    className="border-nerv-light/30 text-nerv-light hover:bg-nerv-light/10 hover:text-nerv-red px-8 py-3 nerv-ui"
                    onClick={() => {
                      const section = document.getElementById("contact");
                      if (section) section.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    CONTACT
                  </Button>
                </div>
              </div>
              <div>
                <NervTerminal />
              </div>
            </div>
          </section>

          {/* Main Projects Section */}
          <section id="projects" className="mb-20">
            <div className="flex items-center mb-12">
              <div className="w-8 h-8 bg-nerv-red/20 border border-nerv-red/40 rounded-full flex items-center justify-center mr-3">
                <Cpu className="w-4 h-4 text-nerv-red" />
              </div>
              <h2 className="eva-section-header text-3xl text-nerv-red">PRIMARY PROJECTS</h2>
              <div className="ml-4 h-px bg-nerv-red/30 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainProjects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </section>

          {/* GitHub Repositories Section */}
          <section id="repositories" className="mb-20">
            <div className="flex items-center mb-12">
              <div className="w-8 h-8 bg-nerv-red/20 border border-nerv-red/40 rounded-full flex items-center justify-center mr-3">
                <Github className="w-4 h-4 text-nerv-red" />
              </div>
              <h2 className="eva-section-header text-3xl text-nerv-red">DEVELOPMENT AREAS</h2>
              <div className="ml-4 h-px bg-nerv-red/30 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {githubProjects.map((repo, index) => (
                <GithubRepo key={index} repo={repo} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-nerv-red/50 text-nerv-red hover:bg-nerv-red/10 nerv-ui"
                onClick={() => window.open("https://github.com/clquwu", "_blank")}
              >
                <Github className="w-4 h-4 mr-2" />
                VIEW ALL REPOSITORIES
              </Button>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mb-20">
            <div className="flex items-center mb-12">
              <div className="w-8 h-8 bg-nerv-red/20 border border-nerv-red/40 rounded-full flex items-center justify-center mr-3">
                <FileCode className="w-4 h-4 text-nerv-red" />
              </div>
              <h2 className="eva-section-header text-3xl text-nerv-red">PERSONNEL FILE</h2>
              <div className="ml-4 h-px bg-nerv-red/30 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-nerv-dark border border-nerv-red/30 p-6 rounded-md">
                <h3 className="eva-section-header text-xl text-white mb-4">DEVELOPER PROFILE</h3>
                <div className="space-y-4 text-nerv-light/80 eva-body-text">
                  <p>
                    First-year Computer Science student at University of Bordeaux, passionate about software development.
                    Strong expertise in Android mobile development (Kotlin/Jetpack Compose) and web development (React/Next.js),
                    demonstrated through innovative applications like Kibo Anime (streaming), Scoreflow (AI sheet music conversion),
                    and PianoSync (MIDI piano learning app).
                  </p>
                  <p>
                    Proactive learner with experience in full-stack development, from mobile applications with advanced features
                    like TV casting and intelligent notifications, to AI-powered web platforms. Skilled in modern development
                    practices including Firebase integration, real-time data management, and user experience optimization.
                  </p>
                  <p>
                    Currently pursuing fundamental programming concepts, object-oriented programming, data structures,
                    and project management methodologies while applying knowledge in practical group projects simulating
                    professional development environments.
                  </p>
                </div>

                <div className="mt-8">
                  <h4 className="eva-section-header text-nerv-red text-lg mb-3">TECHNICAL EXPERTISE</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm text-nerv-light/70 mb-2 nerv-ui">MOBILE DEVELOPMENT</h5>
                      <div className="flex flex-wrap gap-2">
                        {["Kotlin", "Jetpack Compose", "Material TV", "ExoPlayer/Media3", "Navigation Compose", "ViewModel", "LiveData", "WorkManager", "Cast Framework", "App Updates API"].map(
                          (tech) => (
                            <div
                              key={tech}
                              className="px-2 py-1 bg-nerv-red/10 border border-nerv-red/30 rounded text-xs text-nerv-light nerv-tech"
                            >
                              {tech}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm text-nerv-light/70 mb-2 nerv-ui">WEB DEVELOPMENT</h5>
                      <div className="flex flex-wrap gap-2">
                        {["React.js", "Next.js", "JavaScript", "TypeScript", "HTML/CSS"].map(
                          (tech) => (
                            <div
                              key={tech}
                              className="px-2 py-1 bg-nerv-orange/10 border border-nerv-orange/30 rounded text-xs text-nerv-light nerv-tech"
                            >
                              {tech}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-sm text-nerv-light/70 mb-2 nerv-ui">BACKEND & CLOUD</h5>
                      <div className="flex flex-wrap gap-2">
                        {["Firebase", "Firestore", "Analytics", "Crashlytics", "Cloud Storage", "Cloud Messaging", "PostgreSQL", "Debian Admin"].map(
                          (tech) => (
                            <div
                              key={tech}
                              className="px-2 py-1 bg-nerv-green/10 border border-nerv-green/30 rounded text-xs text-nerv-light nerv-tech"
                            >
                              {tech}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-nerv-dark border border-nerv-red/30 p-6 rounded-md">
                  <h3 className="eva-section-header text-xl text-white mb-4">SKILL LEVELS</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-nerv-light/70 nerv-ui">Mobile Development</div>
                      <div className="text-sm text-nerv-red nerv-tech">70%</div>
                    </div>
                    <div className="w-full h-1 bg-nerv-black rounded-full overflow-hidden">
                      <div className="h-full bg-nerv-red" style={{ width: "70%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-nerv-light/70 nerv-ui">Web Development</div>
                      <div className="text-sm text-nerv-red nerv-tech">85%</div>
                    </div>
                    <div className="w-full h-1 bg-nerv-black rounded-full overflow-hidden">
                      <div className="h-full bg-nerv-red" style={{ width: "85%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-nerv-light/70 nerv-ui">AI Integration</div>
                      <div className="text-sm text-nerv-red nerv-tech">55%</div>
                    </div>
                    <div className="w-full h-1 bg-nerv-black rounded-full overflow-hidden">
                      <div className="h-full bg-nerv-red" style={{ width: "55%" }}></div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-nerv-light/70 nerv-ui">Backend & Cloud</div>
                      <div className="text-sm text-nerv-red nerv-tech">70%</div>
                    </div>
                    <div className="w-full h-1 bg-nerv-black rounded-full overflow-hidden">
                      <div className="h-full bg-nerv-red" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-nerv-dark border border-nerv-red/30 p-6 rounded-md">
                  <h3 className="eva-section-header text-xl text-white mb-4">EDUCATION</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-nerv-red pl-4">
                      <h4 className="text-nerv-red font-matisse eva-compressed">Computer Science License</h4>
                      <p className="text-sm text-nerv-light/70 nerv-ui">University of Bordeaux</p>
                      <p className="text-xs text-nerv-light/50 nerv-tech">09/2024 - Present</p>
                      <ul className="text-xs text-nerv-light/60 mt-2 space-y-1">
                        <li>• Programming & Algorithms Fundamentals</li>
                        <li>• Object-Oriented Programming</li>
                        <li>• Data Structures & Databases</li>
                        <li>• Web Development (HTML, CSS, JS)</li>
                        <li>• IT Project Management</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-nerv-dark border border-nerv-red/30 p-6 rounded-md">
                  <h3 className="eva-section-header text-xl text-white mb-4">CONTACT PROTOCOLS</h3>
                  <div className="space-y-4 nerv-ui">
                    <div className="flex items-center space-x-3">
                      <Terminal className="w-5 h-5 text-nerv-red" />
                      <span className="text-nerv-light nerv-email-lowercase">
                        {"raphaelboullaylefur@proton.me".toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Github className="w-5 h-5 text-nerv-red" />
                      <a
                        href="https://github.com/clquwu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-nerv-light nerv-email-lowercase hover:text-nerv-red transition-colors"
                      >
                        github.com/clquwu
                      </a>
                    </div>
                    {/* Added LinkedIn */}
                    <div className="flex items-center space-x-3">
                      <Linkedin className="w-5 h-5 text-nerv-red" />
                       <a
                        href="https://www.linkedin.com/in/raphael-boullay-le-fur-"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-nerv-light nerv-email-lowercase hover:text-nerv-red transition-colors"
                      >
                        linkedin.com/in/raphael-boulla-le-fur
                      </a>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Hexagon className="w-5 h-5 text-nerv-red" />
                      <span className="text-nerv-light nerv-email-lowercase">Bordeaux, France</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
         <section id="contact" className="mb-20">
            <div className="flex items-center mb-12">
              <div className="w-8 h-8 bg-nerv-red/20 border border-nerv-red/40 rounded-full flex items-center justify-center mr-3">
                <Terminal className="w-4 h-4 text-nerv-red" />
              </div>
              <h2 className="eva-section-header text-3xl text-nerv-red">COMMUNICATION CHANNEL</h2>
              <div className="ml-4 h-px bg-nerv-red/30 flex-grow"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-nerv-dark border border-nerv-red/30 p-6 rounded-md">
                <h3 className="eva-section-header text-xl text-white mb-6">DIRECT COMMUNICATION</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-nerv-light/70 mb-2 nerv-ui">NAME</label>
                    <input
                      type="text"
                      className="w-full bg-nerv-black border border-nerv-red/30 rounded p-3 text-nerv-light focus:outline-none focus:border-nerv-red nerv-ui nerv-email-lowercase"
                      placeholder="Enter your name"
                      value={contact.name}
                      onChange={e => setContact({ ...contact, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-nerv-light/70 mb-2 nerv-ui">EMAIL</label>
                    <input
                      type="email"
                      className="w-full bg-nerv-black border border-nerv-red/30 rounded p-3 text-nerv-light focus:outline-none focus:border-nerv-red nerv-ui nerv-email-lowercase"
                      placeholder="Enter your email"
                      value={contact.email}
                      onChange={e => setContact({ ...contact, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-nerv-light/70 mb-2 nerv-ui">MESSAGE</label>
                    <textarea
                      className="w-full bg-nerv-black border border-nerv-red/30 rounded p-3 text-nerv-light focus:outline-none focus:border-nerv-red h-32 nerv-ui nerv-email-lowercase"
                      placeholder="Enter your message"
                      value={contact.message}
                      onChange={e => setContact({ ...contact, message: e.target.value })}
                      required
                    ></textarea>
                  </div>
                  <Button
                    className="w-full bg-nerv-red hover:bg-nerv-red/80 text-white nerv-ui"
                    type="submit"
                    disabled={sending}
                  >
                    <Terminal className="w-4 h-4 mr-2" />
                    {sending ? "SENDING..." : "SEND MESSAGE"}
                  </Button>
                  {sent === "success" && (
                    <div className="text-nerv-green nerv-ui mt-2">Message sent successfully!</div>
                  )}
                  {sent === "error" && (
                    <div className="text-nerv-red nerv-ui mt-2">Failed to send message. Try again.</div>
                  )}
                </form>
              </div>

              <div className="bg-nerv-dark border border-nerv-red/30 p-6 rounded-md">
                <h3 className="eva-section-header text-xl text-white mb-6">TERMINAL STATUS</h3>
                <div className="p-4 bg-nerv-black rounded border border-nerv-red/30 font-mono text-nerv-light text-sm h-64 overflow-y-auto">
                  <div>{">"} Connection established to University of Bordeaux...</div>
                  <div>{">"} Student ID: RBOULLAY-LF</div>
                  <div>{">"} Status: First Year Computer Science</div>
                  <div>{">"} Specialization: Mobile & Web Development</div>
                  <div>{">"} Current Projects: Scoreflow, Kibo Anime, PianoSync</div>
                  <div>{">"} Available for collaboration and internships</div>
                  <div>{">"} Response time: 24-48 hours</div>
                  <div className="mt-4 mb-2">{">"} _</div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-nerv-light/70 nerv-ui">SYSTEM STATUS</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-nerv-green mr-2"></div>
                      <span className="text-nerv-green nerv-tech">ACTIVE</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-nerv-light/70 nerv-ui">AVAILABILITY</div>
                    <div className="text-nerv-light nerv-tech">OPEN TO OPPORTUNITIES</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-nerv-light/70 nerv-ui">LOCATION</div>
                    <div className="text-nerv-light nerv-tech">BORDEAUX, FRANCE</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="magi" className="mb-20">
            <div className="flex items-center mb-12">
              <div className="w-8 h-8 bg-nerv-red/20 border border-nerv-red/40 rounded-full flex items-center justify-center mr-3">
                <Cpu className="w-4 h-4 text-nerv-red" />
              </div>
              <h2 className="eva-section-header text-3xl text-nerv-red">SYSTEM STATUS</h2>
              <div className="ml-4 h-px bg-nerv-red/30 flex-grow"></div>
            </div>

            <MagiSystemStatus />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-nerv-black border-t border-nerv-red/30 py-6 px-4 relative z-10">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <NervLogo className="w-6 h-6 mr-2" />
              <div className="eva-nerv-logo">RAPHAEL BOULLAY--LE FUR</div>
            </div>
            <div className="text-nerv-light/50 text-sm nerv-ui">
              © 2025 RAPHAEL BOULLAY--LE FUR. COMPUTER SCIENCE STUDENT.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}