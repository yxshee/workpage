"use client";

import { useEffect, useCallback, useState, type MouseEvent as ReactMouseEvent } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  image: string;
  githubUrl: string;
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
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncPointerMode = () => setIsFinePointer(pointerQuery.matches);
    syncPointerMode();
    pointerQuery.addEventListener("change", syncPointerMode);
    return () => pointerQuery.removeEventListener("change", syncPointerMode);
  }, []);

  // Preload project images on desktop/fine pointers for flicker-free cursor previews.
  useEffect(() => {
    if (!isFinePointer) return;
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, [projects, isFinePointer]);

  const handleMouseEnter = useCallback((imageSrc: string) => {
    if (!isFinePointer) return;
    if (typeof window !== "undefined" && window.CursorController) {
      window.CursorController.setMode("image", imageSrc);
    }
  }, [isFinePointer]);

  const handleMouseLeave = useCallback(() => {
    if (!isFinePointer) return;
    if (typeof window !== "undefined" && window.CursorController) {
      window.CursorController.reset();
    }
  }, [isFinePointer]);

  useEffect(() => {
    if (!isFinePointer && typeof window !== "undefined" && window.CursorController) {
      window.CursorController.reset();
    }
  }, [isFinePointer]);

  const handleTouchRowClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement>, projectId: number) => {
      if (isFinePointer) return;
      if (expandedProjectId !== projectId) {
        event.preventDefault();
        setExpandedProjectId(projectId);
        return;
      }
      setExpandedProjectId(null);
    },
    [expandedProjectId, isFinePointer],
  );

  return (
    <div 
      className="work-list" 
      onMouseLeave={handleMouseLeave}
    >
      {projects.map((project) => (
        <a
          key={project.id} 
          href={project.githubUrl ?? project.repoUrl ?? githubUrl}
          target="_blank"
          rel="noreferrer"
          className={`work-list__row group relative transition-colors ${expandedProjectId === project.id ? "is-expanded" : ""}`}
          onMouseEnter={() => handleMouseEnter(project.image)}
          onClick={(event) => handleTouchRowClick(event, project.id)}
        >
          <div className="work-list__primary">
            <span className="work-list__index">0{project.id}</span>
            <h3 className="work-list__title text-high">{project.title}</h3>
          </div>
          
          <div className="work-list__meta">
            <span className="work-list__category">{project.category}</span>
            <span className="work-list__year text-high">{project.year}</span>
          </div>

          {!isFinePointer && (
            <div className={`work-list__preview ${expandedProjectId === project.id ? "is-visible" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          )}
        </a>
      ))}
    </div>
  );
}
