/*
 * Shared wedding data for the Kenduri RSVP guest page and admin page.
 * Stored in localStorage under a single key so both pages stay in sync
 * in the same browser. Falls back to the seeded sample data when empty.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'kenduri-rsvp-data';

  var defaultWeddingData = {
    coupleShort: 'Aina & Harith',
    coupleFull: 'Aina Sofea binti Roslan & Harith Danial bin Zulkifli',
    tagline: 'With the blessing of our families, we invite you to celebrate with us.',
    weddingDate: 'Saturday, 12 December 2026',
    weddingTime: '11:00 am — 4:00 pm',
    venue: 'Dewan Seri Melati, Taman Sri Muda,\nShah Alam, Selangor',
    musicNote: 'A soft kompang ensemble welcomes guests at the door, and a laid-back acoustic playlist (Malay and English favourites) plays through lunch. If a song means something to the two of us, drop it in your RSVP message below!',
    rsvps: [
      {
        guestName: 'Farah Izzati',
        attending: true,
        message: 'Tak sabar nak rasa nasi minyak mak long! Congrats you two.'
      },
      {
        guestName: 'Aiman Hakim',
        attending: true,
        message: 'I\u2019ll bring the whole futsal team. See you there!'
      },
      {
        guestName: 'Nurul Aina (cousin)',
        attending: false,
        message: 'In Singapore that weekend — sending love from across the Causeway.'
      }
    ],
    wishes: [
      {
        guestName: 'Mak Long Piah',
        wishText: 'Semoga berkekalan hingga ke Jannah. Doa mak long sentiasa bersama kalian berdua.'
      },
      {
        guestName: 'Uncle Rahim',
        wishText: 'Congratulations! Harith, jaga isteri baik-baik ya. Barakallahu lakuma.'
      },
      {
        guestName: 'Syafiq \u0026 Lina',
        wishText: 'From classmates to this — so happy for you both. Cantik gila the theme!'
      }
    ],
    wishlistItems: [
      { itemName: 'Air fryer', itemNote: 'For weeknight dinners in the new place', taken: false },
      { itemName: 'Dining ware set', itemNote: 'Cream tones to match the house', taken: true },
      { itemName: 'Seterika wap (garment steamer)', itemNote: 'Harith\u2019s baju Melayu needs it', taken: false },
      { itemName: 'Duvet & pillow set', itemNote: 'King size, cotton', taken: false },
      { itemName: 'Sampin tingkat (gift tray)', itemNote: 'Traditional trays for the pelamin', taken: true }
    ]
  };

  /**
   * @ Public methods
   */

  function loadWeddingData() {
    try {
      var storedJson = window.localStorage.getItem(STORAGE_KEY);
      if (!storedJson) {
        return defaultWeddingData;
      }
      var storedData = JSON.parse(storedJson);
      // Merge over defaults so new fields keep working with older saved data.
      return Object.assign({}, defaultWeddingData, storedData);
    } catch (parseError) {
      return defaultWeddingData;
    }
  }

  function saveWeddingData(weddingData) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(weddingData));
    } catch (storageError) {
      // Private browsing or storage full — the pages still work in-memory.
    }
  }

  window.KenduriData = {
    loadWeddingData: loadWeddingData,
    saveWeddingData: saveWeddingData,
    defaultWeddingData: defaultWeddingData
  };
})();
