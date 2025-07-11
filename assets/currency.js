// Currency conversion functionality for multi-currency support
class CurrencyManager {
  constructor() {
    this.currentCurrency = window.shop?.currency || 'EUR';
    this.rates = {};
    this.formatters = new Map();
    this.init();
  }

  init() {
    this.setupCurrencySelectors();
    this.loadExchangeRates();
    this.observePriceElements();
  }

  setupCurrencySelectors() {
    const currencySelectors = document.querySelectorAll('[data-currency-selector]');
    currencySelectors.forEach(selector => {
      selector.addEventListener('change', (e) => {
        this.changeCurrency(e.target.value);
      });
    });
  }

  async loadExchangeRates() {
    try {
      // In a real implementation, you would fetch from Shopify's currency API
      // or a currency exchange service
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      // For now, we'll use static rates - replace with actual API
      this.rates = {
        'EUR': 1.0,
        'USD': 1.1,
        'GBP': 0.85,
        'CAD': 1.35
      };
    } catch (error) {
      console.error('Failed to load exchange rates:', error);
      // Fallback to no conversion
      this.rates = { [this.currentCurrency]: 1.0 };
    }
  }

  changeCurrency(newCurrency) {
    if (newCurrency === this.currentCurrency) return;
    
    this.currentCurrency = newCurrency;
    this.updateAllPrices();
    this.saveCurrencyPreference(newCurrency);
    
    // Update URL parameter for currency
    const url = new URL(window.location);
    url.searchParams.set('currency', newCurrency);
    history.replaceState(null, '', url);
  }

  updateAllPrices() {
    const priceElements = document.querySelectorAll('[data-currency-price]');
    priceElements.forEach(element => {
      this.updatePriceElement(element);
    });
  }

  updatePriceElement(element) {
    const originalPrice = parseFloat(element.dataset.originalPrice || element.dataset.currencyPrice);
    const originalCurrency = element.dataset.originalCurrency || 'EUR';
    
    if (!originalPrice || !this.rates[originalCurrency] || !this.rates[this.currentCurrency]) {
      return;
    }

    // Convert price
    const euroPrice = originalPrice / this.rates[originalCurrency];
    const convertedPrice = euroPrice * this.rates[this.currentCurrency];
    
    // Format and display
    const formattedPrice = this.formatPrice(convertedPrice, this.currentCurrency);
    element.textContent = formattedPrice;
    
    // Store original price if not already stored
    if (!element.dataset.originalPrice) {
      element.dataset.originalPrice = originalPrice;
      element.dataset.originalCurrency = originalCurrency;
    }
  }

  formatPrice(amount, currency) {
    if (!this.formatters.has(currency)) {
      this.formatters.set(currency, new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
    
    return this.formatters.get(currency).format(amount);
  }

  observePriceElements() {
    // Watch for new price elements being added to the DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const priceElements = node.querySelectorAll ? 
              node.querySelectorAll('[data-currency-price]') : [];
            priceElements.forEach(element => {
              this.updatePriceElement(element);
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  saveCurrencyPreference(currency) {
    try {
      localStorage.setItem('shopify_currency', currency);
    } catch (error) {
      // localStorage might not be available
      console.warn('Could not save currency preference:', error);
    }
  }

  loadCurrencyPreference() {
    try {
      return localStorage.getItem('shopify_currency') || this.currentCurrency;
    } catch (error) {
      return this.currentCurrency;
    }
  }

  // Convert Shopify money format to include currency
  static convertMoneyFormat(amount, currency = 'EUR') {
    const formats = {
      'EUR': '€{{amount}}',
      'USD': '${{amount}}',
      'GBP': '£{{amount}}',
      'CAD': 'CA${{amount}}'
    };
    
    const format = formats[currency] || `${currency} {{amount}}`;
    const value = (amount / 100).toFixed(2);
    return format.replace('{{amount}}', value);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (window.shop && window.shop.enabled_currencies && window.shop.enabled_currencies.length > 1) {
    window.CurrencyManager = new CurrencyManager();
  }
});

// Make available globally
window.CurrencyUtils = {
  convertMoneyFormat: CurrencyManager.convertMoneyFormat
};
