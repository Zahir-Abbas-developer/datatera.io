import React, { useState, useRef, useEffect } from 'react';
import { Button } from './button';
import { Input } from './input';
import AddTransformationModal from './AddTransformationModal';
import { 
  Menu, ChevronDown, ChevronUp, MoreVertical, Plus, X, Search, User, LogOut, 
  ExternalLink, Star, Pencil, Copy, EyeOff, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import TransformationLimitBar from '../transformations/TransformationLimitBar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';

const Sidebar = ({
  userEmail = 'mihailorama@gmail.com',
  transformations = [
    'Useful SaaS',
    'SaaS - competitio',
    'B2B Email sample',
    'Marketing tools',
    'BUSIEST AIRPORTS',
    'Tennis Clubs in',
    'Investors_URLs',
    'Investors_info',
    'Amazon - list of',
    'Kits y reactivos',
    'PH_info',
    'HR_full',
  ],
  onSelect,
  onLogout,
  isCollapsed,
  onCollapsedChange,
  setIsStickyHeader
}) => {
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingItem, setEditingItem] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const bottomItems = [
    {
      label: 'Upgrade to PLUS',
      icon: <Star className="w-5 h-5 text-yellow-400" fill="#facc15" />,
      onClick: () => {},
    },
    {
      label: 'Profile',
      icon: <User className="w-5 h-5 text-[#b3b3b3]" />,
      onClick: () => {},
    },
    {
      label: 'Integrations',
      icon: <ExternalLink className="w-5 h-5 text-[#b3b3b3]" />,
      onClick: () => {},
    },
    {
      label: 'Logout',
      icon: <LogOut className="w-5 h-5 text-[#b3b3b3]" />,
      onClick: onLogout || (() => {
        logout();
        localStorage.clear();
        navigate('/signin');
      }),
    },
  ];

  const handleMenuAction = (action, item) => {
    switch (action) {
      case 'edit':
        setModalMode('edit');
        setEditingItem({
          name: item,
          description: ''
        });
        setShowModal(true);
        break;
      case 'copyWithoutData':
        break;
      case 'copyWithData':
        break;
      case 'unsubscribe':
        break;
      case 'delete':
        break;
    }
    setOpenMenuIdx(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuIdx(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        onCollapsedChange(true);
      } else {
        onCollapsedChange(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [onCollapsedChange]);

  const chromeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-5 h-5"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <circle cx="24" cy="24" r="20" fill="#fff" />
      <path fill="#ea4335" d="M24 4a20 20 0 0 1 17.32 10H24z"/>
      <path fill="#4285f4" d="M24 44a20 20 0 0 1-17.32-10H24z"/>
      <path fill="#fbbc04" d="M44 24a20 20 0 0 1-20 20V24z"/>
      <path fill="#34a853" d="M4 24a20 20 0 0 1 20-20v20z"/>
      <circle cx="24" cy="24" r="8" fill="#fff"/>
      <circle cx="24" cy="24" r="5" fill="#4285f4"/>
    </svg>
  );

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => onCollapsedChange(true)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#1E1E1E] text-white flex flex-col border-r border-[#232323] shadow-lg transition-all duration-300 z-50",
          isMobile ? "w-[300px]" : "w-[300px]",
          isCollapsed && "translate-x-[-100%] lg:translate-x-0 lg:w-16",
          !isCollapsed && isMobile && "shadow-xl"
        )}
      >
        {/* Collapse/Expand Button - Desktop */}
        {!isMobile && (
          <button
            onClick={() => onCollapsedChange((c) => !c)}
            className="absolute top-20 -right-4 z-20 bg-[#232323] text-white rounded-full shadow p-1 border border-[#232323] hover:bg-[#333] transition"
            style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundClip: "black" }}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}

        {/* Sidebar content */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          {!isCollapsed && (
            <div className="flex-shrink-0 flex items-center justify-center px-4 py-3 border-b border-[#232323] w-full">
              <span className="font-semibold text-base truncate">{userEmail}</span>
              {isMobile && (
                <button
                  onClick={() => onCollapsedChange(true)}
                  className="p-1 rounded-full hover:bg-[#333]"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}

          {!isCollapsed && (
            <div className="flex justify-center">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-[60%] flex items-center justify-center">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* New transformation button */}
          {!isCollapsed && (
            <div className="flex-shrink-0 px-4 pt-4 pb-2 w-full">
              <Button 
                onClick={() => {
                  setShowModal(true);
                  setIsStickyHeader(false);
                  if (isMobile) onCollapsedChange(true);
                }} 
                className="w-full bg-[#4AA181] hover:bg-[#388a6b] text-white font-semibold flex items-center gap-2"
              >
                <Plus size={18} /> New transformation...
              </Button>
            </div>
          )}

          {!isCollapsed && (
            <div className="pt-1 pb-1">
              <TransformationLimitBar used={10} total={10} />
            </div>
          )}

          {/* Search */}
          {!isCollapsed && (
            <div className="flex-shrink-0 px-4 pb-2 w-full">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search transformations..."
                  className="w-full bg-[#232323] text-white border-none pl-10 placeholder:text-gray-400 focus:ring-2 focus:ring-[#4AA181]"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          )}

          {/* List */}
          <nav className="flex-1 overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent hover:scrollbar-thumb-[#444]">
            <style jsx>{`
              nav::-webkit-scrollbar {
                width: 8px;
              }
              nav::-webkit-scrollbar-track {
                background: transparent;
              }
              nav::-webkit-scrollbar-thumb {
                background-color: #333;
                border-radius: 4px;
              }
              nav::-webkit-scrollbar-thumb:hover {
                background-color: #444;
              }
              nav {
                scrollbar-width: thin;
                scrollbar-color: #333 transparent;
              }
              nav:hover {
                scrollbar-color: #444 transparent;
              }
            `}</style>
            <ul className={`space-y-1 py-2 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
              {transformations.map((item, idx) => (
                <li key={idx} className="relative w-full">
                  <div
                    className={`flex items-center ${!isCollapsed ? 'justify-between' : 'justify-center'} px-2 py-2 rounded-lg hover:bg-[#232323] cursor-pointer group`}
                    title={isCollapsed ? item : undefined}
                  >
                    <div className="flex items-center gap-2" onClick={() => {
                      navigate('/transformation-table');
                      if (isMobile) onCollapsedChange(true);
                    }}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Menu size={18} className="text-[#b3b3b3]" />
                        </TooltipTrigger>
                        <TooltipContent side="right" className="bg-[#232323] text-white rounded px-3 py-1.5 text-sm shadow-lg border border-[#333]">
                          {item}
                        </TooltipContent>
                      </Tooltip>
                      {!isCollapsed && <span className="truncate font-medium text-sm">{item}</span>}
                    </div>
                    {!isCollapsed && (
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                        <ChevronUp size={16} className="hover:text-[#4AA181] cursor-pointer" />
                        <ChevronDown size={16} className="hover:text-[#4AA181] cursor-pointer" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuIdx(openMenuIdx === idx ? null : idx);
                          }}
                          className="hover:text-[#4AA181] cursor-pointer relative"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Dropdown menu */}
                  {openMenuIdx === idx && !isCollapsed && (
                    <div
                      ref={menuRef}
                      className="absolute right-2 top-2 z-50 w-60 bg-[#232323] rounded-xl shadow-xl py-2 px-1 border border-[#333] animate-fade-in"
                    >
                      <button
                        onClick={() => handleMenuAction('edit', item)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#292929] text-sm text-white"
                      >
                        <Pencil size={16} /> Edit name and descriptions
                      </button>
                      <button
                        onClick={() => handleMenuAction('copyWithoutData', item)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#292929] text-sm text-white"
                      >
                        <Copy size={16} /> Copy without data
                      </button>
                      <button
                        onClick={() => handleMenuAction('copyWithData', item)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#292929] text-sm text-white"
                      >
                        <Copy size={16} /> Copy with data
                      </button>
                      <button
                        onClick={() => handleMenuAction('unsubscribe', item)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#292929] text-sm text-red-400"
                      >
                        <EyeOff size={16} /> Unsubscribe
                      </button>
                      <button
                        onClick={() => handleMenuAction('delete', item)}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-[#292929] text-sm text-red-500"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className={`flex-shrink-0 border-t border-[#232323] px-2 py-4 space-y-1 w-full ${
            isCollapsed ? 'flex flex-col items-center' : ''
          }`}>
            {bottomItems.map((item) =>
              isCollapsed ? (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={item.onClick}
                      className="flex items-center justify-center w-10 h-10 p-0 rounded-lg hover:bg-[#232323] transition-colors"
                    >
                      {item.icon}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-[#232323] text-white rounded px-3 py-1.5 text-sm shadow-lg border border-[#333]"
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#232323] text-sm font-medium text-left transition-colors"
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            )}
            {/* Chrome Extension Button */}
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="flex items-center justify-center w-10 h-10 p-0 rounded-lg hover:bg-[#232323] transition-colors"
                    title="Install Chrome Browser Extension"
                  >
                    {chromeIcon}
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-[#232323] text-white rounded px-3 py-1.5 text-sm shadow-lg border border-[#333]"
                >
                  Install Chrome Browser Extension
                </TooltipContent>
              </Tooltip>
            ) : (
              <button
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-[#232323] text-sm font-medium text-left transition-colors"
              >
                {chromeIcon}
                Install Chrome Browser Extension
              </button>
            )}
          </div>
        </div>
      </aside>

      <AddTransformationModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
          setModalMode('create');
          setEditingItem(null);
        }}
        mode={modalMode}
        initialData={editingItem}
        setIsStickyHeader={setIsStickyHeader}
      />
    </>
  );
};

export default Sidebar;