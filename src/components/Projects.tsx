import './Projects.css'

const Projects = () => {
  const projects = [
    {
      title: 'Community Platform',
      description: 'A full-stack web application for connecting students and organizing events. Built with React, Node.js, and PostgreSQL.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      status: 'Active',
      link: 'https://github.com/uwaterloomsa'
    },
    {
      title: 'CLI Toolkit',
      description: 'Command-line tools to automate common development tasks. Written in Go with a focus on performance and reliability.',
      tags: ['Go', 'CLI', 'DevOps'],
      status: 'Active',
      link: 'https://github.com/uwaterloomsa'
    },
    {
      title: 'API Gateway',
      description: 'Microservices architecture with REST and GraphQL APIs. Features authentication, rate limiting, and monitoring.',
      tags: ['TypeScript', 'GraphQL', 'Docker'],
      status: 'Active',
      link: 'https://github.com/uwaterloomsa'
    },
    {
      title: 'Mobile App',
      description: 'Cross-platform mobile application for campus services. Built with React Native and integrated with university systems.',
      tags: ['React Native', 'Mobile', 'API'],
      status: 'In Development',
      link: 'https://github.com/uwaterloomsa'
    },
    {
      title: 'Machine Learning Pipeline',
      description: 'Data processing and ML model training infrastructure. Includes automated pipelines and model deployment tools.',
      tags: ['Python', 'TensorFlow', 'AWS'],
      status: 'Active',
      link: 'https://github.com/uwaterloomsa'
    },
    {
      title: 'Design System',
      description: 'Comprehensive UI component library with accessibility features. Used across multiple projects for consistent design.',
      tags: ['React', 'Storybook', 'CSS'],
      status: 'Active',
      link: 'https://github.com/uwaterloomsa'
    }
  ]

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="section-header">
          <span className="section-badge">Our Work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            Explore our diverse portfolio of open source projects. From web applications 
            to machine learning pipelines, we're building solutions that matter.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <div className="project-status" data-status={project.status.toLowerCase().replace(' ', '-')}>
                  {project.status}
                </div>
              </div>
              
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="project-tag">{tag}</span>
                ))}
              </div>

              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <span>View Project</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>
          ))}
        </div>

        <div className="projects-footer">
          <p>Want to contribute or start a new project?</p>
          <a 
            href="https://github.com/uwaterloomsa" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Check out our GitHub organization →
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
