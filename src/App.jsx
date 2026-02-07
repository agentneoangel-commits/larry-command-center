import { useState, useEffect } from 'react'
import Header from './components/Header'
import AuthGate from './components/AuthGate'
import Dashboard from './components/Dashboard'
import MediaLibrary from './components/MediaLibrary'
import Scheduler from './components/Scheduler'
import Analytics from './components/Analytics'
import QuickPost from './components/QuickPost'

const TABS = [
  { id: 'dashboard', label: 'COMMAND', icon: '○' },
  { id: 'media', label: 'ASSETS', icon: '▢' },
  { id: 'scheduler', label: 'OPS', icon: '◈' },
  { id: 'analytics', label: 'INTEL', icon: '◉' },
  { id: 'post', label: 'DEPLOY', icon: '▶' },
]

// ACTUAL Larry images - AI generated + real photos
const LARRY_IMAGES = [
  { 
    id: 1, 
    url: '/images/larry-spa-day-1.png', 
    caption: 'Spa day is EVERY day when youre this fabulous 💅✨ #PamperedPup',
    category: 'pamper',
    pillar: 'Pamper',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 2, 
    url: '/images/larry-epic-giant-1.png', 
    caption: 'Larry the Giant: Coming to a city near you 🐾🌆 #EpicLarry #MoviePoster',
    category: 'epic',
    pillar: 'Epic',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 3, 
    url: '/images/larry-hungry-chef-1.png', 
    caption: 'When the treat jar is EMPTY but your appetite is FULL 🍖😤 #HungryLarry #ChefLife',
    category: 'trend',
    pillar: 'Trend',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 4, 
    url: '/images/larry-shake-off-1.png', 
    caption: 'Shake it off, shake it off! 💦🎵 #WetDogVibes #Trending',
    category: 'trend',
    pillar: 'Trend',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 5, 
    url: '/images/larry-astronaut-1.png', 
    caption: 'One small step for Larry, one giant leap for dogkind 🚀🌙 #SpacePup #Epic',
    category: 'epic',
    pillar: 'Epic',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 6, 
    url: '/images/larry-king-1.png', 
    caption: 'All hail King Larry! 👑🐕 Bow before the treat dispenser ruler! #KingMode #Pampered',
    category: 'pamper',
    pillar: 'Pamper',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 7, 
    url: '/images/larry-cozy-rainy-1.png', 
    caption: 'Rainy days = cozy blanket burrito time 🌧️🛋️ #CozyVibes #PamperPillar',
    category: 'pamper',
    pillar: 'Pamper',
    status: 'ready',
    type: 'ai-generated'
  },
  { 
    id: 8, 
    url: '/images/larry-cuddle-puppy.png', 
    caption: 'Real friends let you use them as a pillow 💕🐾 #CuddleBuddies #LarryAndFriend',
    category: 'pamper',
    pillar: 'Pamper',
    status: 'ready',
    type: 'real-photo'
  },
  { 
    id: 9, 
    url: '/images/larry-cuddle-puppy-v2.png', 
    caption: 'Sunday snuggles with my bestie 🥰 #BestFriends #CuddlePuddle',
    category: 'pamper',
    pillar: 'Pamper',
    status: 'ready',
    type: 'real-photo'
  },
  { 
    id: 10, 
    url: '/images/larry-cuddling-puppy-v1.png', 
    caption: 'This is MY puppy. There are many like it, but this one is mine 🐕💙 #ProtectiveLarry',
    category: 'pamper',
    pillar: 'Pamper',
    status: 'ready',
    type: 'real-photo'
  },
]

const SAMPLE_SCHEDULED = [
  { id: 1, imageId: 1, platform: 'instagram', time: '2025-02-07T08:00:00', status: 'scheduled' },
  { id: 2, imageId: 2, platform: 'tiktok', time: '2025-02-07T19:00:00', status: 'scheduled' },
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem('larry_images')
    return saved ? JSON.parse(saved) : LARRY_IMAGES
  })
  const [scheduled, setScheduled] = useState(() => {
    const saved = localStorage.getItem('larry_scheduled')
    return saved ? JSON.parse(saved) : SAMPLE_SCHEDULED
  })

  useEffect(() => {
    localStorage.setItem('larry_images', JSON.stringify(images))
  }, [images])

  useEffect(() => {
    localStorage.setItem('larry_scheduled', JSON.stringify(scheduled))
  }, [scheduled])

  const handleAuth = () => setIsAuthenticated(true)
  
  const addImage = (imageData) => {
    setImages(prev => [imageData, ...prev])
  }
  
  const deleteImage = (id) => {
    setImages(prev => prev.filter(img => img.id !== id))
  }
  
  const schedulePost = (postData) => {
    setScheduled(prev => [...prev, { ...postData, id: Date.now() }])
  }
  
  const deleteScheduled = (id) => {
    setScheduled(prev => prev.filter(post => post.id !== id))
  }

  if (!isAuthenticated) {
    return <AuthGate onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen bg-hud-dark hud-grid-bg font-hud">
      <Header />
      
      <nav className="flex border-b border-cyan-500/20 bg-slate-900/80 backdrop-blur">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 font-mono-hud text-xs tracking-widest transition-all ${
              activeTab === tab.id 
                ? 'bg-cyan-500/20 text-cyan-300 border-b-2 border-cyan-400' 
                : 'text-slate-400 hover:text-cyan-200 hover:bg-cyan-500/10'
            }`}
          >
            <span className="text-cyan-500">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="p-4 h-[calc(100vh-120px)] overflow-auto">
        {activeTab === 'dashboard' && <Dashboard images={images} scheduled={scheduled} />}
        {activeTab === 'media' && <MediaLibrary images={images} onAdd={addImage} onDelete={deleteImage} />}
        {activeTab === 'scheduler' && <Scheduler images={images} scheduled={scheduled} onSchedule={schedulePost} onDelete={deleteScheduled} />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'post' && <QuickPost images={images} onSchedule={schedulePost} />}
      </main>
    </div>
  )
}

export default App