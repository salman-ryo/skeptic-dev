import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Play } from 'lucide-react'

interface PodcastEpisode {
  number: string
  title: string
  duration: string
}

export function PodcastSection() {
  const episodes: PodcastEpisode[] = [
    { number: "#01", title: "Art in the City: How Modern Sculpture...", duration: "0:54" },
    { number: "#02", title: "Is Film Photography Really Making a...", duration: "1:02" },
    { number: "#03", title: "Behind the Scenes of Galleries: How...", duration: "0:42" },
    { number: "#04", title: "Culture Online: Can Digital Replace I...", duration: "0:42" },
    { number: "#05", title: "Music as Therapy: How Sounds Influ...", duration: "0:56" },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start bg-gray-50 rounded-lg p-8">
      <div className="space-y-6">
        <div className="space-y-4">
          <span className="text-sm font-medium">Podcast</span>
          <h3 className="font-bold">The Creative Pulse</h3>
        </div>
        <div className="space-y-2">
          {episodes.map((episode) => (
            <div 
              key={episode.number}
              className="flex items-center justify-between py-2 group cursor-pointer hover:bg-gray-100 rounded px-2"
            >
              <div className="flex items-center gap-3">
                <Play className="w-4 h-4 text-gray-400 group-hover:text-black" />
                <span className="text-sm font-medium">{episode.number}</span>
                <span className="text-sm text-gray-600">{episode.title}</span>
              </div>
              <span className="text-sm text-gray-400">{episode.duration}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl font-bold">Have You Heard Our Podcast Yet?</h2>
        <Button 
          className="w-full md:w-auto bg-coral-500 hover:bg-coral-600 rounded-full px-8"
        >
          Playlist
        </Button>
      </div>
    </div>
  )
}

