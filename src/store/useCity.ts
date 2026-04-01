import { create } from 'zustand'
import { Building } from '@/data/city-map'

interface CityState {
  selectedBuilding: Building | null
  hoveredBuilding: Building | null
  cameraMode: 'orbit' | 'firstperson'
  infoPanelOpen: boolean
  fileContent: string | null
  fileLoading: boolean

  setSelectedBuilding: (b: Building | null) => void
  setHoveredBuilding: (b: Building | null) => void
  setCameraMode: (mode: 'orbit' | 'firstperson') => void
  setInfoPanelOpen: (open: boolean) => void
  setFileContent: (content: string | null) => void
  setFileLoading: (loading: boolean) => void
}

export const useCityStore = create<CityState>((set) => ({
  selectedBuilding: null,
  hoveredBuilding: null,
  cameraMode: 'orbit',
  infoPanelOpen: false,
  fileContent: null,
  fileLoading: false,

  setSelectedBuilding: (b) => set({ selectedBuilding: b, infoPanelOpen: b !== null }),
  setHoveredBuilding: (b) => set({ hoveredBuilding: b }),
  setCameraMode: (mode) => set({ cameraMode: mode }),
  setInfoPanelOpen: (open) => set({ infoPanelOpen: open }),
  setFileContent: (content) => set({ fileContent: content }),
  setFileLoading: (loading) => set({ fileLoading: loading }),
}))
