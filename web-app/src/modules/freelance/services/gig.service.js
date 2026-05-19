import axios from "axios"
import { auth } from "../../../auth/firebase";

const API_URL = "http://localhost:5000/api/gigs"

export const gigService = {
  // Get all gigs with filters
  getAllGigs: async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString()
      const res = await axios.get(`${API_URL}?${params}`)
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get single gig by ID
  getGigById: async (gigId) => {
    try {
      const res = await axios.get(`${API_URL}/${gigId}`)
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get gigs by category
  getGigsByCategory: async (category) => {
    try {
      const res = await axios.get(`${API_URL}/category/${category}`)
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Get my gigs (freelancer)
  getMyGigs: async () => {
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await axios.get(`${API_URL}/my-gigs/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Create new gig
  createGig: async (gigData) => {
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await axios.post(`${API_URL}`, gigData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Update gig
  updateGig: async (gigId, gigData) => {
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await axios.put(`${API_URL}/${gigId}`, gigData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Delete gig
  deleteGig: async (gigId) => {
    try {
      const token = await auth.currentUser?.getIdToken()
      const res = await axios.delete(`${API_URL}/${gigId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}
