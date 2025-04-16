#!/usr/bin/env node

// MODULE: Authentification & PWA
// RAISON: Script pour exécuter des tests Lighthouse et vérifier le score PWA
// DÉPENDANCES: package.json (lighthouse, chrome-launcher)

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

const URL = process.env.TEST_URL || 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../../lighthouse-reports');

async function runLighthouse() {
  console.log(`🚀 Démarrage des tests Lighthouse sur ${URL}`);
  
  // Créer le répertoire de sortie s'il n'existe pas
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  try {
    // Lancer Chrome
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    
    // Configuration des options Lighthouse
    const options = {
      logLevel: 'info',
      output: 'html',
      port: chrome.port,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'],
      // Ajouter des flags spécifiques pour simuler un appareil mobile
      emulatedFormFactor: 'mobile',
      throttlingMethod: 'simulate',
      // Simuler une connexion 3G lente
      throttling: {
        rttMs: 150,
        throughputKbps: 1638.4,
        cpuSlowdownMultiplier: 4
      }
    };
    
    // Exécuter Lighthouse
    console.log('🔍 Analyse en cours...');
    const runnerResult = await lighthouse(URL, options);
    
    // Fermer Chrome
    await chrome.kill();
    
    // Générer le nom du fichier avec la date
    const date = new Date().toISOString().replace(/:/g, '-');
    const outputFile = path.join(OUTPUT_DIR, `lighthouse-report-${date}.html`);
    
    // Enregistrer le rapport HTML
    fs.writeFileSync(outputFile, runnerResult.report);
    console.log(`✅ Rapport sauvegardé : ${outputFile}`);
    
    // Afficher les scores
    console.log('\n📊 SCORES LIGHTHOUSE:');
    console.log('--------------------');
    const scores = Object.entries(runnerResult.lhr.categories).map(([key, category]) => {
      return {
        category: category.title,
        score: Math.round(category.score * 100)
      };
    });
    
    scores.forEach(({ category, score }) => {
      const scoreColor = score >= 90 ? '\x1b[32m' : score >= 50 ? '\x1b[33m' : '\x1b[31m';
      console.log(`${category}: ${scoreColor}${score}/100\x1b[0m`);
    });
    
    // Vérifier spécifiquement le score PWA
    const pwaScore = scores.find(s => s.category === 'PWA').score;
    if (pwaScore < 90) {
      console.log('\n⚠️ \x1b[33mATTENTION: Le score PWA est inférieur à 90. Consulter le rapport pour les détails.\x1b[0m');
      
      // Afficher les éléments PWA qui ont échoué
      console.log('\nÉléments PWA à améliorer:');
      const pwaAudits = Object.values(runnerResult.lhr.audits)
        .filter(audit => audit.id.startsWith('pwa-') && audit.score !== 1);
      
      pwaAudits.forEach(audit => {
        console.log(`- ${audit.title}`);
      });
    } else {
      console.log('\n🎉 \x1b[32mSUCCÈS: Le score PWA est excellent !\x1b[0m');
    }
    
    return { success: true, scores };
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution de Lighthouse:', error);
    return { success: false, error: error.message };
  }
}

// Exécuter le test si appelé directement
if (require.main === module) {
  runLighthouse()
    .then(result => {
      if (!result.success) {
        process.exit(1);
      }
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { runLighthouse }; 