/**
 * BROWSER CONSOLE TEST SCRIPT
 * 
 * Run this in your browser console (F12) while viewing the Seasonal-only page
 * to verify zero leaks.
 * 
 * Usage:
 * 1. Open the generated strategy page for Seasonal-only + Bookings
 * 2. Press F12 to open DevTools
 * 3. Go to Console tab
 * 4. Copy/paste this entire script and press Enter
 * 5. Review the results
 */

console.log('🔍 Starting Seasonal-Only Leak Detection Test...\n');

const body = document.body.innerText.toLowerCase();
const html = document.documentElement.outerHTML.toLowerCase();

// Test results object
const results = {
  passed: [],
  failed: [],
};

// Helper function to test for absence of terms
function testAbsence(term, description) {
  const found = body.includes(term) || html.includes(term);
  if (found) {
    results.failed.push(`❌ FAIL: Found "${term}" (${description})`);
    
    // Find where it appears
    const matches = document.body.innerHTML.match(new RegExp(`.{0,50}${term}.{0,50}`, 'gi'));
    if (matches && matches.length > 0) {
      console.log(`   Context: "${matches[0].replace(/<[^>]*>/g, '')}"`);
    }
  } else {
    results.passed.push(`✅ PASS: No "${term}" found (${description})`);
  }
}

// Helper function to test for presence of terms
function testPresence(term, description) {
  const found = body.includes(term) || html.includes(term);
  if (found) {
    results.passed.push(`✅ PASS: Found "${term}" (${description})`);
  } else {
    results.failed.push(`❌ FAIL: Missing "${term}" (${description})`);
  }
}

console.log('📋 Test 1: Forbidden Overnight Terms (Must be ABSENT)');
console.log('─────────────────────────────────────────────────────');
testAbsence('$/night', 'overnight pricing format');
testAbsence('per night', 'overnight pricing phrase');
testAbsence('$45', 'specific overnight price');
testAbsence('nightly', 'nightly reference');
testAbsence('weekend getaway', 'weekend language');
testAbsence('overnight camping', 'overnight camping phrase');
testAbsence('tonight', 'tonight urgency');

console.log('\n📋 Test 2: Forbidden Model References (Must be ABSENT)');
console.log('─────────────────────────────────────────────────────');
testAbsence('linda chen', 'trailer sales review');
testAbsence('bought our trailer', 'trailer purchase mention');
testAbsence('trailers for sale', 'trailer sales link');
testAbsence('cottage rentals', 'cottage rentals link');
testAbsence('overnight camping', 'overnight camping footer link');

console.log('\n📋 Test 3: Forbidden CTA Language (Must be ABSENT)');
console.log('─────────────────────────────────────────────────────');
testAbsence('book your stay', 'generic booking language');
testAbsence('ready to book your stay', 'overnight-style CTA headline');
testAbsence('request availability', 'old seasonal CTA (replaced with Book Now)');

console.log('\n📋 Test 4: Required Seasonal Terms (Must be PRESENT)');
console.log('─────────────────────────────────────────────────────');
testPresence('book now', 'primary CTA');
testPresence('seasonal', 'seasonal references');
testPresence('$3,200', 'seasonal pricing');
testPresence('your seasonal home', 'seasonal headline phrase');

console.log('\n📋 Test 5: Specific Component Checks');
console.log('─────────────────────────────────────────────────────');

// Check rates section
const ratesSection = document.body.innerHTML.match(/\$\d+[\/\s]*(night|season)/gi);
if (ratesSection) {
  const nightlyRates = ratesSection.filter(r => r.toLowerCase().includes('night'));
  const seasonalRates = ratesSection.filter(r => r.toLowerCase().includes('season'));
  
  if (nightlyRates.length > 0) {
    results.failed.push(`❌ FAIL: Found ${nightlyRates.length} nightly rate(s): ${nightlyRates.join(', ')}`);
  } else {
    results.passed.push(`✅ PASS: No nightly rates found`);
  }
  
  if (seasonalRates.length > 0) {
    results.passed.push(`✅ PASS: Found ${seasonalRates.length} seasonal rate(s): ${seasonalRates.join(', ')}`);
  } else {
    results.failed.push(`❌ FAIL: No seasonal rates found`);
  }
}

// Check footer links
const footerLinks = Array.from(document.querySelectorAll('footer a')).map(a => a.textContent.toLowerCase().trim());
const forbiddenFooterLinks = ['overnight camping', 'trailers for sale', 'cottage rentals'];
const allowedFooterLinks = ['seasonal sites', 'group bookings'];

forbiddenFooterLinks.forEach(link => {
  if (footerLinks.some(l => l.includes(link))) {
    results.failed.push(`❌ FAIL: Footer contains forbidden link: "${link}"`);
  } else {
    results.passed.push(`✅ PASS: Footer does not contain: "${link}"`);
  }
});

allowedFooterLinks.forEach(link => {
  if (footerLinks.some(l => l.includes(link))) {
    results.passed.push(`✅ PASS: Footer contains allowed link: "${link}"`);
  }
});

// Check CTA buttons
const ctaButtons = Array.from(document.querySelectorAll('button, a[class*="btn"], a[class*="cta"]'))
  .map(el => el.textContent.trim())
  .filter(text => text.length > 0 && text.length < 50);

const primaryCTACount = ctaButtons.filter(btn => btn.toLowerCase() === 'book now').length;
if (primaryCTACount > 0) {
  results.passed.push(`✅ PASS: Found ${primaryCTACount} "Book Now" CTA(s)`);
} else {
  results.failed.push(`❌ FAIL: No "Book Now" CTAs found`);
}

// Check for stay type cards
const stayTypeCards = Array.from(document.querySelectorAll('h3, h4'))
  .map(h => h.textContent.trim().toLowerCase());

const hasSeasonalCard = stayTypeCards.some(text => text.includes('seasonal sites'));
const hasOvernightCard = stayTypeCards.some(text => text.includes('overnight camping'));
const hasCottageCard = stayTypeCards.some(text => text.includes('cottage rental'));

if (hasSeasonalCard) {
  results.passed.push(`✅ PASS: Seasonal Sites card found`);
}
if (hasOvernightCard) {
  results.failed.push(`❌ FAIL: Overnight Camping card found (should be hidden)`);
} else {
  results.passed.push(`✅ PASS: Overnight Camping card not found`);
}
if (hasCottageCard) {
  results.failed.push(`❌ FAIL: Cottage Rentals card found (should be hidden)`);
} else {
  results.passed.push(`✅ PASS: Cottage Rentals card not found`);
}

// Print Results
console.log('\n═══════════════════════════════════════════════════════');
console.log('📊 TEST RESULTS SUMMARY');
console.log('═══════════════════════════════════════════════════════\n');

if (results.failed.length === 0) {
  console.log('✅ ALL TESTS PASSED! Zero leaks detected.\n');
  console.log(`Total Checks: ${results.passed.length}`);
  console.log(`Passed: ${results.passed.length} ✅`);
  console.log(`Failed: ${results.failed.length} ❌\n`);
  
  console.log('%c🎉 PRODUCTION READY - Seasonal-only filtering is working perfectly!', 'color: green; font-weight: bold; font-size: 14px;');
} else {
  console.log('❌ SOME TESTS FAILED - Leaks detected.\n');
  console.log(`Total Checks: ${results.passed.length + results.failed.length}`);
  console.log(`Passed: ${results.passed.length} ✅`);
  console.log(`Failed: ${results.failed.length} ❌\n`);
  
  console.log('%c⚠️ FAILURES DETECTED', 'color: red; font-weight: bold; font-size: 14px;');
  console.log('\nFailed Tests:');
  results.failed.forEach(fail => console.log(fail));
  
  console.log('\n💡 Possible Solutions:');
  console.log('1. Clear browser cache (Ctrl+Shift+Delete)');
  console.log('2. Hard refresh page (Ctrl+F5 / Cmd+Shift+R)');
  console.log('3. Regenerate strategy page from wizard');
  console.log('4. Check wizard data in localStorage:');
  console.log('   localStorage.getItem("campgroundShowroom_wizard")');
}

console.log('\n─────────────────────────────────────────────────────');
console.log('Detailed Results:');
console.log('─────────────────────────────────────────────────────\n');

if (results.passed.length > 0) {
  console.log('✅ PASSED TESTS:');
  results.passed.forEach(pass => console.log(pass));
}

if (results.failed.length > 0) {
  console.log('\n❌ FAILED TESTS:');
  results.failed.forEach(fail => console.log(fail));
}

console.log('\n═══════════════════════════════════════════════════════');

// Return summary object for programmatic access
const summary = {
  totalTests: results.passed.length + results.failed.length,
  passed: results.passed.length,
  failed: results.failed.length,
  passRate: ((results.passed.length / (results.passed.length + results.failed.length)) * 100).toFixed(1) + '%',
  allPassed: results.failed.length === 0,
  failures: results.failed,
};

console.log('\n📦 Summary Object (access via window.testResults):');
console.table(summary);

// Store in window for easy access
window.testResults = summary;

console.log('\n✅ Test complete! Check results above.\n');
