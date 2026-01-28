import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/api';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        contactEmail: 'support@fittrack.com',
        contactPhone: '+1 (555) 123-4567',
        address: '123 Luxury Lane, Cinema District, Star City, SC 90210',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.064560411833!2d-118.34212513909935!3d34.09800312678033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf07045279bf%3A0xf67a9a6797bdfae4!2sTCL%20Chinese%20Theatre!5e0!3m2!1sen!2sus!4v1703058888046!5m2!1sen!2sus',
        socialLinks: {
            facebook: '#',
            twitter: '#',
            instagram: '#',
            youtube: '#'
        },
        operationalHours: 'Mon - Sun: 9:00 AM - 11:00 PM',
        maintenanceMode: false
    });
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const { data } = await api.get('/settings');
            setSettings(data);
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings) => {
        try {
            const { data } = await api.put('/settings', newSettings);
            setSettings(data);
            return { success: true };
        } catch (error) {
            console.error('Error updating settings:', error);
            return { success: false, error };
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    return (
        <SettingsContext.Provider value={{ settings, loading, updateSettings, refreshSettings: fetchSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
