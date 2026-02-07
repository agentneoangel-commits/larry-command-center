import { 
  Image, 
  Calendar, 
  TrendingUp, 
  Clock,
  Instagram,
  Music2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

const PILLAR_COLORS = {
  Epic: 'from-purple-500 to-pink-500',
  Pamper: 'from-cyan-500 to-blue-500',
  Trend: 'from-emerald-500 to-teal-500',
  Educational: 'from-amber-500 to-orange-500',
}

export default function Dashboard({ images, scheduled }) {
  const readyCount = images.filter(i => i.status === 'ready').length
  const postedCount = images.filter(i => i.status === 'posted').length
  const scheduledCount = scheduled.length

  const stats = [
    { 
      label: 'READY ASSETS', 
      value: readyCount, 
      icon: Image, 
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    { 
      label: 'SCHEDULED', 
      value: scheduledCount, 
      icon: Calendar, 
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    { 
      label: 'DEPLOYED', 
      value: postedCount, 
      icon: CheckCircle2, 
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    { 
      label: 'ENGAGEMENT', 
      value: '2.4K', 
      icon: TrendingUp, 
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    },
  ]

  const platformStatus = [
    { name: 'Instagram', handle: '@larrydavidsworld', status: 'connected', icon: Instagram },
    { name: 'TikTok', handle: '@petlarry', status: 'connected', icon: Music2 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="hud-border p-4 relative group">
            <div className={`hud-corner hud-corner-tl ${stat.color.replace('text-', 'border-')}`}></div>
            <div className={`hud-corner hud-corner-br ${stat.color.replace('text-', 'border-')}`}></div>
            
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-mono-hud text-slate-500">{'//' + String(i + 1).padStart(2, '0')}</span>
            </div>
            
            <div className="mt-3">
              <div className={`text-3xl font-hud font-bold ${stat.color} hud-text-glow`}>
                {stat.value}
              </div>
              <div className="text-xs font-mono-hud text-slate-400 mt-1 tracking-wider">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="hud-border p-4">
          <div className="hud-corner hud-corner-tl border-cyan-400"></div>
          <div className="hud-corner hud-corner-tr border-cyan-400"></div>
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-hud font-semibold text-cyan-300 tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 animate-pulse"></span>
              PLATFORM STATUS
            </h3>
          </div>
          
          <div className="space-y-3">
            {platformStatus.map((platform, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                    <platform.icon className="w-5 h-5 text-slate-300" />
                  </div>
                  <div>
                    <div className="font-hud font-medium text-slate-200">{platform.name}</div>
                    <div className="text-xs font-mono-hud text-slate-500">{platform.handle}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    platform.status === 'connected' ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                  } animate-pulse`}></div>
                  <span className={`text-xs font-mono-hud uppercase ${
                    platform.status === 'connected' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    {platform.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hud-border p-4">
          <div className="hud-corner hud-corner-tl border-purple-400"></div>
          <div className="hud-corner hud-corner-br border-purple-400"></div>
          
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-hud font-semibold text-purple-300 tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4" />
              UPCOMING DEPLOYMENTS
            </h3>
          </div>
          
          {scheduled.length > 0 ? (
            <div className="space-y-3">
              {scheduled.slice(0, 3).map((post, i) => {
                const image = images.find(img => img.id === post.imageId)
                return (
                  <div key={post.id} className="flex items-center gap-3 p-3 bg-slate-900/50 border border-slate-700/50">
                    <div className="w-12 h-12 rounded overflow-hidden bg-slate-800">
                      {image && (
                        <img src={image.url} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-mono-hud text-slate-400">
                        {new Date(post.time).toLocaleDateString()} @ {new Date(post.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded font-mono-hud uppercase ${
                          post.platform === 'instagram' ? 'bg-purple-500/20 text-purple-300' : 'bg-pink-500/20 text-pink-300'
                        }`}>
                          {post.platform}
                        </span>
                      </div>
                    </div>
                    <AlertCircle className="w-4 h-4 text-cyan-500/50" />
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 font-mono-hud text-sm">
              NO SCHEDULED DEPLOYMENTS
            </div>
          )}
        </div>
      </div>

      <div className="hud-border p-4">
        <div className="hud-corner hud-corner-tl border-pink-400"></div>
        <div className="hud-corner hud-corner-br border-pink-400"></div>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-hud font-semibold text-pink-300 tracking-wider">
            CONTENT PILLAR BREAKDOWN
          </h3>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {['Epic', 'Pamper', 'Trend', 'Educational'].map((pillar) => {
            const count = images.filter(i => i.pillar === pillar).length
            const gradient = PILLAR_COLORS[pillar]
            return (
              <div key={pillar} className="relative">
                <div className={`h-2 rounded-full bg-gradient-to-r ${gradient} mb-2`}></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-hud text-slate-400">{pillar.toUpperCase()}</span>
                  <span className="text-lg font-hud font-bold text-slate-200">{count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}