# Add Commission Reduction to AeroOps - aeroops.html
## Step-by-Step Guide

---

## 📝 STEP 1: Edit aeroops.html

### Find the location (Line 2520)

Open your `aeroops.html` file in a text editor and find this line:

```html
                          </div>
                        </div>

                        <div class="ptc-row" id="refund-svc-row">
```

This is around **line 2520-2523**.

The section before it should look like:
```html
          <div class="ptc-field" id="refund-commission-wrap">
            <label for="f-commission-f">Commission Adjustment / Discount</label>
            <input type="number" step="0.01" id="f-commission-f" class="mono ptc-refund-calc" placeholder="0.00" value="0" />
          </div>
        </div>
```

---

## ✅ STEP 2: Add the HTML fields

**AFTER** line 2521 (after the closing `</div>` of Commission Adjustment), and **BEFORE** the "Agency Service Charge" section, add this code:

```html
        <div class="ptc-row" id="refund-commission-reduction-row">
          <div class="ptc-field" id="refund-original-commission-wrap">
            <label for="f-original-commission-f">Original Commission</label>
            <input type="number" step="0.01" id="f-original-commission-f" class="mono ptc-refund-calc" placeholder="0.00" value="0" />
          </div>
          <div class="ptc-field" id="refund-commission-reduction-wrap">
            <label for="f-commission-reduction-f">Commission Reduction <span style="font-weight:400; font-size:11px;">(for Tax Refund)</span></label>
            <input type="number" step="0.01" id="f-commission-reduction-f" class="mono ptc-refund-calc" placeholder="0.00" value="0" />
          </div>
        </div>

        <div class="ptc-field" id="refund-reduced-commission-wrap" style="display:none;">
          <label for="f-reduced-commission-f">Reduced Commission <span style="font-weight:400;">(auto-calculated)</span></label>
          <input type="text" id="f-reduced-commission-f" class="mono" readonly placeholder="0.00" style="background:var(--refund-soft); font-weight:700; cursor:default;" value="0.00" />
        </div>
```

So the complete section should now look like:

```html
          <div class="ptc-field" id="refund-commission-wrap">
            <label for="f-commission-f">Commission Adjustment / Discount</label>
            <input type="number" step="0.01" id="f-commission-f" class="mono ptc-refund-calc" placeholder="0.00" value="0" />
          </div>
        </div>

        <!-- COMMISSION REDUCTION FIELDS - NEW -->
        <div class="ptc-row" id="refund-commission-reduction-row">
          <div class="ptc-field" id="refund-original-commission-wrap">
            <label for="f-original-commission-f">Original Commission</label>
            <input type="number" step="0.01" id="f-original-commission-f" class="mono ptc-refund-calc" placeholder="0.00" value="0" />
          </div>
          <div class="ptc-field" id="refund-commission-reduction-wrap">
            <label for="f-commission-reduction-f">Commission Reduction <span style="font-weight:400; font-size:11px;">(for Tax Refund)</span></label>
            <input type="number" step="0.01" id="f-commission-reduction-f" class="mono ptc-refund-calc" placeholder="0.00" value="0" />
          </div>
        </div>

        <div class="ptc-field" id="refund-reduced-commission-wrap" style="display:none;">
          <label for="f-reduced-commission-f">Reduced Commission <span style="font-weight:400;">(auto-calculated)</span></label>
          <input type="text" id="f-reduced-commission-f" class="mono" readonly placeholder="0.00" style="background:var(--refund-soft); font-weight:700; cursor:default;" value="0.00" />
        </div>

        <div class="ptc-row" id="refund-svc-row">
          <div class="ptc-field" style="grid-column: 1 / -1;">
            <label for="f-svc-f"><span id="f-svc-f-label-text">Agency Service Charge</span>
```

---

## 🔧 STEP 3: Add JavaScript to app.js

Open your `app.js` file and add this code at the **END** of the file (before the last `</script>` tag or at the end of your JavaScript):

```javascript
// ========================================
// Commission Reduction for Tax Refund
// ========================================

// Initialize commission reduction on page load
document.addEventListener('DOMContentLoaded', function() {
  const originalCommissionInput = document.getElementById('f-original-commission-f');
  const commissionReductionInput = document.getElementById('f-commission-reduction-f');
  const reducedCommissionInput = document.getElementById('f-reduced-commission-f');
  const refundModeSelect = document.getElementById('f-mode-f');

  // Show/hide commission reduction fields based on refund type
  function updateCommissionReductionVisibility() {
    const refundType = refundModeSelect.value;
    const commissionReductionRow = document.getElementById('refund-commission-reduction-row');
    const reducedCommissionWrap = document.getElementById('refund-reduced-commission-wrap');

    if (refundType === 'TAX_ONLY') {
      // Show for Tax Refund
      if (commissionReductionRow) commissionReductionRow.style.display = '';
      if (reducedCommissionWrap) reducedCommissionWrap.style.display = '';
    } else {
      // Hide for other types
      if (commissionReductionRow) commissionReductionRow.style.display = 'none';
      if (reducedCommissionWrap) reducedCommissionWrap.style.display = 'none';
    }
  }

  // Calculate reduced commission
  function updateReducedCommission() {
    if (!originalCommissionInput || !commissionReductionInput || !reducedCommissionInput) return;

    const originalCommission = parseFloat(originalCommissionInput.value || 0);
    const commissionReduction = parseFloat(commissionReductionInput.value || 0);

    if (commissionReduction > originalCommission) {
      alert(`Commission Reduction ($${commissionReduction.toFixed(2)}) cannot exceed Original Commission ($${originalCommission.toFixed(2)})`);
      commissionReductionInput.value = originalCommission;
    }

    const reducedCommission = Math.max(0, originalCommission - commissionReduction);
    reducedCommissionInput.value = reducedCommission.toFixed(2);
  }

  // Event listeners
  if (refundModeSelect) {
    refundModeSelect.addEventListener('change', updateCommissionReductionVisibility);
  }
  if (originalCommissionInput) {
    originalCommissionInput.addEventListener('input', updateReducedCommission);
  }
  if (commissionReductionInput) {
    commissionReductionInput.addEventListener('input', updateReducedCommission);
  }

  updateCommissionReductionVisibility();
});
```

---

## ✨ STEP 4: Save and Test

1. **Save** both `aeroops.html` and `app.js`
2. **Open** aeroops.html in your browser
3. **Select** "Tax Refund" from the Refund Type dropdown
4. **Check** that "Original Commission" and "Commission Reduction" fields appear
5. **Enter** values:
   - Original Commission: `50.00`
   - Commission Reduction: `25.00`
6. **Verify** Reduced Commission auto-calculates to `25.00`

---

## 📤 STEP 5: Upload to GitHub

```bash
# Navigate to your repo
cd Sarwar-osman-portfolio

# Add the updated files
git add aeroops.html app.js

# Commit with message
git commit -m "Add Commission Reduction to Tax Refund type - Fields now appear for Tax Refund, auto-calculate reduced commission"

# Push to GitHub
git push origin main
```

---

## 🎯 How It Works

**Tax Refund Type:**
- Original Commission: `$50.00`
- Commission Reduction: `$25.00` ← User enters this
- Reduced Commission: `$25.00` ← Auto-calculates (50 - 25)

**Other Refund Types:**
- Commission fields hidden
- Works as before

---

## ✅ Checklist

- [ ] Located line 2520 in aeroops.html
- [ ] Added HTML fields between Commission Adjustment and Agency Service Charge
- [ ] Added JavaScript code to app.js
- [ ] Saved both files
- [ ] Tested in browser with Tax Refund type
- [ ] Verified fields appear only for Tax Refund
- [ ] Verified auto-calculation works
- [ ] Committed and pushed to GitHub

---

## 🆘 If It's Not Showing

**Problem:** Fields not appearing
- Check that you added HTML in the CORRECT location (after line 2520)
- Verify JavaScript file is linked: `<script defer src="./app.js"></script>`
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh page

**Problem:** Calculation not working
- Open browser DevTools (F12)
- Check Console for errors
- Verify input field IDs match: `f-original-commission-f`, `f-commission-reduction-f`

**Problem:** Only showing for all types
- Check the JavaScript refund type check: `if (refundType === 'TAX_ONLY')`
- The refund type value should be `TAX_ONLY` for Tax Refund

---

**Version:** 2.1.0  
**Date:** 2026-09-23  
**Status:** ✅ Ready to Use
