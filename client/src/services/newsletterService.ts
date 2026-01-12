// Newsletter service to handle email subscriptions
interface NewsletterEntry {
  id: string;
  email: string;
  timestamp: string;
}

class NewsletterService {
  private static STORAGE_KEY = 'amanexNewsletterSubscribers';

  // Get all newsletter subscribers
  static getAllSubscribers(): NewsletterEntry[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading newsletter subscribers:', error);
      return [];
    }
  }

  // Add a new subscriber
  static addSubscriber(email: string): NewsletterEntry {
    const newEntry: NewsletterEntry = {
      id: Date.now().toString(),
      email,
      timestamp: new Date().toISOString()
    };

    try {
      const existingSubscribers = this.getAllSubscribers();
      const updatedSubscribers = [...existingSubscribers, newEntry];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSubscribers));
    } catch (error) {
      console.error('Error saving newsletter subscriber:', error);
    }

    return newEntry;
  }

  // Export subscribers as CSV
  static exportToCSV(subscribers: NewsletterEntry[]): string {
    const headers = ['ID', 'Email', 'Timestamp'];
    const rows = subscribers.map(sub => [
      sub.id,
      sub.email,
      sub.timestamp
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => `"${row[0]}","${row[1]}","${row[2]}"`)
    ].join('\n');

    return csvContent;
  }
}

export default NewsletterService;