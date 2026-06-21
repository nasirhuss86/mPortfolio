"use client";

import { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import Dock from "../components/Dock";
import DesktopIcon from "../components/DesktopIcon";
import AboutMeModal from "../components/AboutMeModal";
import ProjectModal from "../components/ProjectModal";
import ResumeModal from "../components/ResumeModal";
import SpotifyModal from "../components/SpotifyModal";
import { useDraggable } from "../lib/useDraggable";

interface DraggableItem {
  id: string;
  position: { x: number; y: number };
  isDragging: boolean;
}

const initialItems: Record<string, DraggableItem> = {
  "todo-note": {
    id: "todo-note",
    position: { x: 27, y: 58 },
    isDragging: false,
  },
  "project-01": {
    id: "project-01",
    position: { x: 800, y: 237 },
    isDragging: false,
  },
  "project-02": {
    id: "project-02",
    position: { x: 920, y: 130 },
    isDragging: false,
  },
  "project-03": {
    id: "project-03",
    position: { x: 930, y: 400 },
    isDragging: false,
  },
  "project-04": {
    id: "project-04",
    position: { x: 953, y: 518 },
    isDragging: false,
  },
  "resume-pdf": {
    id: "resume-pdf",
    position: { x: 105, y: 455 },
    isDragging: false,
  },
  "about-me": {
    id: "about-me",
    position: { x: 371, y: 565 },
    isDragging: false,
  },
  "dont-look": {
    id: "dont-look",
    position: { x: 750, y: 574 },
    isDragging: false,
  },
};

export default function Home() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAboutMe, setShowAboutMe] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);

  const handleDesktopIconClick = (itemId: string) => {
    setSelectedItem(itemId);
    if (itemId === "resume-pdf") {
      setShowResume(true);
    } else if (itemId === "todo-note") {
      // Todo note is just draggable, no modal
      return;
    } else if (itemId === "about-me") {
      setShowAboutMe(true);
    } else if (itemId.startsWith("project-")) {
      setShowProject(true);
    } else {
      setShowModal(true);
    }
  };

  const { items, handleMouseDown, handleMouseMove, handleMouseUp } =
    useDraggable({
      initialItems,
      containerBounds: { width: 1500, height: 799 },
      onItemClick: handleDesktopIconClick,
    });

  const handleDockIconClick = (iconName: string) => {
    console.log(`Clicked dock icon: ${iconName}`);
    if (iconName === "spotify") {
      setShowSpotify(true);
    } else if (iconName === "finder") {
      // Open a random folder when Finder is clicked
      const folders = [
        "project-01",
        "project-02",
        "project-03",
        "project-04",
      ];
      const randomFolder = folders[Math.floor(Math.random() * folders.length)];
      handleDesktopIconClick(randomFolder);
    } else if (iconName === "trash") {
      openDontLook();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const closeAboutMe = () => {
    setShowAboutMe(false);
    setSelectedItem(null);
  };

  const closeProject = () => {
    setShowProject(false);
    setSelectedItem(null);
  };

  const closeResume = () => {
    setShowResume(false);
    setSelectedItem(null);
  };

  const closeSpotify = () => {
    setShowSpotify(false);
  };

  const openDontLook = () => {
    setSelectedItem("dont-look");
    setShowModal(true);
  };

  // Close inline modal on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModal, closeModal]);

  return (
    <div
      className="relative w-full h-screen bg-[#f7f7f7] overflow-hidden select-none desktop-bg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Desktop Background Pattern */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: "url(/images/bg-lines.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Menu Bar */}
      <MenuBar />

      {/* Welcome Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <p className="text-black font-normal text-[26px] mb-2 welcome-text font-instrument">
          welcome to my
        </p>
        <p
          className="text-black font-normal text-[80px] italic leading-none welcome-text-large font-instrument"
          style={{
            letterSpacing: "0.02em",
          }}
        >
          portfolio.
        </p>
      </div>

      {/* Sticky Note */}
      <DesktopIcon
        id="todo-note"
        position={items["todo-note"].position}
        isDragging={items["todo-note"].isDragging}
        onMouseDown={handleMouseDown}
        type="note"
      />

      {/* Project Folders */}
      <DesktopIcon
        id="project-01"
        position={items["project-01"].position}
        isDragging={items["project-01"].isDragging}
        onMouseDown={handleMouseDown}
        type="folder"
        title="Project 01"
        subtitle="(AI Station)"
        icon="/images/folderIcon.png"
      />

      <DesktopIcon
        id="project-02"
        position={items["project-02"].position}
        isDragging={items["project-02"].isDragging}
        onMouseDown={handleMouseDown}
        type="folder"
        title="Project 02"
        subtitle="(PDF-Genius)"
        icon="/images/folderIcon.png"
      />

      <DesktopIcon
        id="project-03"
        position={items["project-03"].position}
        isDragging={items["project-03"].isDragging}
        onMouseDown={handleMouseDown}
        type="folder"
        title="Project 03"
        subtitle="(AI Pitch Deck Analyzer)"
        icon="/images/folderIcon.png"
      />

      <DesktopIcon
        id="project-04"
        position={items["project-04"].position}
        isDragging={items["project-04"].isDragging}
        onMouseDown={handleMouseDown}
        type="folder"
        title="Project 04"
        subtitle="(Custom Gmail MCP)"
        icon="/images/folderIcon.png"
      />

      {/* Resume PDF */}
      <DesktopIcon
        id="resume-pdf"
        position={items["resume-pdf"].position}
        isDragging={items["resume-pdf"].isDragging}
        onMouseDown={handleMouseDown}
        type="file"
        title="Resume.pdf"
        icon="/images/fileIcon.png"
        width={60}
      />

      {/* About Me Folder */}
      <DesktopIcon
        id="about-me"
        position={items["about-me"].position}
        isDragging={items["about-me"].isDragging}
        onMouseDown={handleMouseDown}
        type="folder"
        title="About Me"
        icon="/images/folderIcon.png"
      />

      {/* Don't Look Folder */}
      <DesktopIcon
        id="dont-look"
        position={items["dont-look"].position}
        isDragging={items["dont-look"].isDragging}
        onMouseDown={handleMouseDown}
        type="folder"
        title="Don't Look"
        icon="/images/bill-full.png"
        width={70}
      />

      {/* Dock */}
      <Dock onIconClick={handleDockIconClick} />

      {/* About Me Modal */}
      <AboutMeModal isOpen={showAboutMe} onClose={closeAboutMe} />

      {/* Project Modal */}
      <ProjectModal
        isOpen={showProject}
        onClose={closeProject}
        projectId={selectedItem || ""}
        setShowAboutMe={setShowAboutMe}
        setShowResume={setShowResume}
        onOpenDontLook={openDontLook}
      />

      {/* Resume Modal */}
      <ResumeModal isOpen={showResume} onClose={closeResume} />

      {/* Spotify Modal */}
      <SpotifyModal isOpen={showSpotify} onClose={closeSpotify} />

      {/* Modal for other folder content */}
      {showModal && selectedItem && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg shadow-window p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={closeModal}
                  className="w-3 h-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity cursor-pointer"
                />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
              </div>
            </div>
            <div className="text-black">
              {selectedItem === "dont-look" && (
                <div className="text-center">
                  <p className="text-2xl mb-2">🤫</p>
                  <p className="mb-2">
                    You weren&apos;t supposed to look here...
                  </p>
                  <p className="text-sm text-gray-600">
                    But since you did, lets talk??
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
