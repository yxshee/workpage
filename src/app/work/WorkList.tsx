"use client";

import { useEffect, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  repoUrl?: string;
}

interface WorkListProps {
  projects: Project[];
  githubUrl: string;
}

/**
 * WorkList: Client component that handles cursor-image mode on Work page.
 * 
 * When hovering a project item:
 * - Sets cursor to "image" mode with that project's image
 * - Image follows cursor smoothly as the preview
 * 
 * When leaving the list:
 * - Resets cursor to normal mode
 */
export default function WorkList({ projects, githubUrl }: WorkListProps) {
  // Preload project images on mount for flicker-free switching
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, [projects]);

  const handleMouseEnter = useCallback((imageSrc: string) => {
    if (typeof window !== "undefined" && window.CursorController) {
      window.CursorController.setMode("image", imageSrc);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (typeof window !== "undefined" && window.CursorController) {
      window.CursorController.reset();
    }
  }, []);

  return (
    <div 
      className="grid grid-cols-1 gap-px border-t border-b" 
      style={{ backgroundColor: 'var(--border)', borderColor: 'var(--border)' }}
      onMouseLeave={handleMouseLeave}
    >
      {projects.map((project) => (
        <a
          key={project.id} 
          href={project.repoUrl ?? githubUrl}
          target="_blank"
          rel="noreferrer"
          className="group relative flex justify-between items-center py-12 px-4 transition-colors"
          style={{ backgroundColor: 'var(--surface-700)', color: 'var(--text-high)' }}
          onMouseEnter={() => handleMouseEnter(project.image)}
        >
          <div className="flex items-center gap-8">
            <span className="text-[10px] uppercase tracking-tighter opacity-40 group-hover:opacity-100" style={{ color: 'var(--text-high)' }}>0{project.id}</span>
            <h3 className="text-3xl md:text-4xl uppercase tracking-tighter" style={{ color: 'var(--text-high)' }}>{project.title}</h3>
          </div>
          
          <div className="flex items-center gap-20">
            <span className="text-xs uppercase tracking-tight opacity-40 group-hover:opacity-100" style={{ color: 'var(--text-high)' }}>{project.category}</span>
            <span className="text-xs uppercase tracking-tight" style={{ color: 'var(--text-high)' }}>{project.year}</span>
          </div>
        </a>
      ))}
    </div>
  );
}
