import React from 'react'

import Description from './Description'
import ProjectAvatar from '../ProjectAvatar'
import Stars from '../Stars'

const ProjectTableView = ({
  title,
  comment,
  icon,
  projects,
  showStars,
  showDelta = true,
  deltaFilter = 'yearly'
}) => {
  
  const maxDelta = projects.map(p => p.delta).reduce((a, b) => Math.max(a,b))

  return (
    <div className="project-table">
      {projects.map((project, i) => (
        <ProjectTableView.Row
          key={project.slug}
          maxDelta={maxDelta}
          project={project}
          showStars={showStars}
          showDelta={showDelta}
          deltaFilter={deltaFilter}
          index={i + 1}
        />
      ))}
    </div>
  )
}

ProjectTableView.Row = ({
  project,
  showStars,
  showDelta,
  deltaFilter,
  showDescription = true,
  index,
  maxDelta,
}) => {
  const url = project.url || project.repository

  // use relative scale
  const widthPercent = project.delta*100/maxDelta

  // use absolute scale based on Vue as the max
  // const widthPercent = project.delta*100/39263
  
  return (
    <a className="project-table-row" href={url}>
      <div className="project-table-bar" style={{width: `${widthPercent}%`}}/>
      <ProjectAvatar project={project} size={50} />
      <div className="main-column">
        <div className="row-1">
          <div>
            <span className="project-table-rank">#{index}</span>
            <span>{project.name}</span>
          </div>
          <div>
            <Stars value={project.delta} decimals={1} />
          </div>
        </div>
        <div className="description-section">
          <Description text={project.description} />
        </div>
      </div>
    </a>
  )
}

export default ProjectTableView
