# Commission Reduction Integration Guide
## For Existing AeroOps Refund Form

---

## 📋 Overview

Add Commission Reduction fields to your existing refund form (Tax Refund type).

**What you'll add:**
- Commission Reduction input field
- Original Commission field
- Reduced Commission field (auto-calculated)

---

## 🎯 Step 1: Locate Your Form in HTML

Find the refund form section in your HTML. Based on your screenshot, look for:

```html
<div class="refund-details">
  <label>TICKET NUMBER(S)</label>
  <input type="text" id="ticketNumber" />
  
  <label>REFUND TYPE</label>
  <select id="refundType">
    <option value="Tax Refund">Tax Refund</option>
    ...
  </select>
  
  <label>TAX</label>
  <input type="number" id="tax" />
  
  <label>PENALTY</label>
  ...
  
  <label>AIRLINE REFUND/CANCELLATION FEE</label>
  ...
  
  <label>AGENCY SERVICE CHARGE</label>
  <input type="number" id="agencyServiceCharge" />
  
  <!-- ADD COMMISSION FIELDS HERE ↓↓↓ -->
</div>
```

---

## ✅ Step 2: Add HTML Fields

**After the "AGENCY SERVICE CHARGE" field**, add this HTML:

```html
<!-- Commission Reduction Section -->
<div class="form-group">
  <label for="originalCommission">ORIGINAL COMMISSION</label>
  <input 
    type="number" 
    id="originalCommission" 
    name="originalCommission" 
    step="0.01" 
    min="0" 
    value="0.00"
  >
  <small>Total commission amount</small>
</div>

<div class="form-group">
  <label for="commissionReduction">COMMISSION REDUCTION</label>
  <input 
    type="number" 
    id="commissionReduction" 
    name="commissionReduction" 
    step="0.01" 
    min="0" 
    value="0.00"
  >
  <small>Amount of commission to reduce (same as other refund types)</small>
</div>

<div class="form-group">
  <label for="reducedCommission">REDUCED COMMISSION</label>
  <input 
    type="number" 
    id="reducedCommission" 
    name="reducedCommission" 
    step="0.01" 
    min="0" 
    value="0.00"
    readonly
    style="background-color: #f5f5f5;"
  >
  <small>Commission after reduction (Original - Reduction)</small>
</div>
```

---

## 🎨 Step 3: Add CSS Styling

Link the CSS file in your HTML `<head>`:

```html
<head>
  <!-- Your existing styles -->
  <link rel="stylesheet" href="commission-reduction-styles.css">
</head>
```

Or copy the CSS content directly into your `style.css` file.

---

## 💻 Step 4: Add JavaScript Code

Add this to your `app.js` or script file:

```javascript
// Initialize Commission Reduction functionality
function initCommissionReduction() {
  const commissionReductionField = document.getElementById('commissionReduction');
  const originalCommissionField = document.getElementById('originalCommission');
  const reducedCommissionField = document.getElementById('reducedCommission');

  // Calculate reduced commission when inputs change
  if (commissionReductionField && originalCommissionField) {
    commissionReductionField.addEventListener('input', updateReducedCommission);
    originalCommissionField.addEventListener('input', updateReducedCommission);
  }
}

// Calculate: Reduced Commission = Original - Reduction
function updateReducedCommission() {
  const originalCommission = parseFloat(
    document.getElementById('originalCommission').value || 0
  );
  const commissionReduction = parseFloat(
    document.getElementById('commissionReduction').value || 0
  );

  // Validate
  if (commissionReduction > originalCommission) {
    alert(`Commission Reduction cannot exceed Original Commission ($${originalCommission.toFixed(2)})`);
    document.getElementById('commissionReduction').value = originalCommission;
  }

  // Calculate
  const reducedCommission = Math.max(0, originalCommission - commissionReduction);
  document.getElementById('reducedCommission').value = reducedCommission.toFixed(2);
}

// Call on page load
document.addEventListener('DOMContentLoaded', initCommissionReduction);
```

---

## 📊 Step 5: Update Form Submission

Modify your form submission handler to include commission reduction:

```javascript
function handleRefundSubmit(event) {
  event.preventDefault();

  // Get form values
  const ticketNumber = document.getElementById('ticketNumber').value;
  const refundType = document.getElementById('refundType').value;
  const tax = parseFloat(document.getElementById('tax').value || 0);
  const originalCommission = parseFloat(document.getElementById('originalCommission').value || 0);
  const commissionReduction = parseFloat(document.getElementById('commissionReduction').value || 0);
  const reducedCommission = parseFloat(document.getElementById('reducedCommission').value || 0);

  // For Tax Refund: total includes commission reduction
  const totalRefund = refundType === 'Tax Refund' 
    ? tax + commissionReduction 
    : tax;

  // Log entry
  const logEntry = {
    timestamp: new Date().toISOString(),
    ticketNumber,
    refundType,
    taxRefund: tax,
    originalCommission,
    commissionReduction,
    reducedCommission,
    totalRefund
  };

  console.log('Refund Entry:', logEntry);

  // Save or process the refund
  saveRefund(logEntry);
}
```

---

## 🔍 Step 6: Verify Integration

1. Open your form in browser
2. Select "Tax Refund" refund type
3. Enter values:
   - Tax: 150.00
   - Original Commission: 50.00
   - Commission Reduction: 25.00
4. Check that "Reduced Commission" auto-calculates to 25.00 (50 - 25)
5. Total Refund should be 175.00 (150 + 25)

---

## 📸 Expected Form Layout

```
REFUND DETAILS
├─ TICKET NUMBER(S) ────── [______]
├─ REFUND TYPE ──────────── [Tax Refund ▼]
├─ TAX ──────────────────── [0.00]
├─ PENALTY ──────────────── [0]
├─ AIRLINE REFUND/CANCELLATION FEE [0]
├─ AGENCY SERVICE CHARGE ── [0.00]
│
├─ ORIGINAL COMMISSION ──── [50.00] ← NEW
├─ COMMISSION REDUCTION ─── [25.00] ← NEW
├─ REDUCED COMMISSION ────── [25.00] ← NEW (auto-calculated)
│
└─ Show calculation [>]
```

---

## ✨ How It Works

### Example Calculation

**Tax Refund with Commission Reduction:**

```
Tax Amount:                 $150.00
Original Commission:         $50.00
Commission Reduction:        $25.00  ← User enters this
                            ─────────
Reduced Commission:          $25.00  ← Auto-calculated (50 - 25)
Total Refund (Customer):    $175.00  ← Includes commission reduction
                            ─────────
Remaining Agent Commission:  $25.00
```

**Form Behavior:**
1. User enters Original Commission: $50.00
2. User enters Commission Reduction: $25.00
3. System auto-calculates Reduced Commission: $25.00
4. Total Refund = Tax ($150) + Commission Reduction ($25) = **$175.00**

---

## 🧪 Testing Scenarios

### Test 1: Commission Reduction > 0
```
Original Commission: 50.00
Commission Reduction: 25.00
Expected Reduced: 25.00 ✓
Expected Total: 175.00 (150 + 25) ✓
```

### Test 2: Commission Reduction = 0
```
Original Commission: 50.00
Commission Reduction: 0.00
Expected Reduced: 50.00 ✓
Expected Total: 150.00 (150 + 0) ✓
```

### Test 3: Validation (Reduction > Original)
```
Original Commission: 50.00
Commission Reduction: 75.00
Expected: Error alert "Cannot exceed $50.00" ✓
```

---

## 📝 Entry Log Display

When refund is processed, show this in your entry log:

```
═══════════════════════════════════════════
REFUND ENTRY LOG
═══════════════════════════════════════════
Booking Reference: 13-ABC-123-XYZ
Refund Type: Tax Refund

CALCULATION SUMMARY:
─────────────────────────────────────────
Tax Refund Amount:         $150.00
Original Commission:        $50.00
Commission Reduction:       $25.00
Reduced Commission:         $25.00
─────────────────────────────────────────
TOTAL REFUND (Customer):   $175.00
Remaining Agent Commission: $25.00
═══════════════════════════════════════════
```

---

## 🚀 Files to Use

1. **commission-reduction-html-snippet.html** - Copy HTML fields
2. **commission-reduction-js-code.js** - Copy JavaScript functions
3. **commission-reduction-styles.css** - Copy CSS styling

---

## 🔗 Integration Checklist

- [ ] Copy HTML fields to your form
- [ ] Link or include CSS file
- [ ] Add JavaScript initialization code
- [ ] Update form submission handler
- [ ] Test with Tax Refund type
- [ ] Test with Commission Reduction = 0
- [ ] Test with Commission Reduction > 0
- [ ] Verify entry log displays correctly
- [ ] Verify data is saved
- [ ] Test validation (reduction cannot exceed original)

---

## ⚠️ Common Issues

### Commission Reduction not calculating
- Ensure JavaScript `initCommissionReduction()` is called
- Check browser console for errors
- Verify input field IDs match: `commissionReduction`, `originalCommission`, `reducedCommission`

### Fields not visible
- Check that CSS file is linked
- Verify display properties are not set to `display: none`

### Values not saving
- Ensure form submission handler is properly wired
- Check that input IDs match in HTML and JavaScript

### Validation not working
- Verify JavaScript functions are loaded
- Check browser console for errors
- Ensure event listeners are attached to correct elements

---

## 💡 Customization

### Hide fields for non-Tax Refunds
```javascript
function showCommissionFieldsForTaxRefund() {
  const refundType = document.getElementById('refundType').value;
  const commissionGroup = document.querySelectorAll('[for="originalCommission"], [for="commissionReduction"], [for="reducedCommission"]');
  
  commissionGroup.forEach(el => {
    el.parentElement.style.display = refundType === 'Tax Refund' ? 'block' : 'none';
  });
}

document.getElementById('refundType').addEventListener('change', showCommissionFieldsForTaxRefund);
```

### Change field styling
Edit `commission-reduction-styles.css` to match your existing form theme.

---

## 📞 Support

For questions:
1. Review the HTML/CSS/JS code
2. Check browser console for errors
3. Verify all field IDs match
4. Test each step individually

---

**Version:** 2.1.0  
**Last Updated:** 2026-09-23  
**Status:** ✅ Ready for Integration
