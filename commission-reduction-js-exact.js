// ========================================
// ADD THIS TO app.js - Commission Reduction for Tax Refund
// ========================================

// Calculate reduced commission when inputs change
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
      // Show commission reduction fields for Tax Refund
      if (commissionReductionRow) commissionReductionRow.style.display = '';
      if (reducedCommissionWrap) reducedCommissionWrap.style.display = '';
    } else {
      // Hide for other refund types
      if (commissionReductionRow) commissionReductionRow.style.display = 'none';
      if (reducedCommissionWrap) reducedCommissionWrap.style.display = 'none';
    }
  }

  // Calculate reduced commission: Original - Reduction
  function updateReducedCommission() {
    if (!originalCommissionInput || !commissionReductionInput || !reducedCommissionInput) return;

    const originalCommission = parseFloat(originalCommissionInput.value || 0);
    const commissionReduction = parseFloat(commissionReductionInput.value || 0);

    // Validation: reduction cannot exceed original
    if (commissionReduction > originalCommission) {
      alert(`Commission Reduction cannot exceed Original Commission ($${originalCommission.toFixed(2)})`);
      commissionReductionInput.value = originalCommission;
    }

    // Calculate reduced commission
    const reducedCommission = Math.max(0, originalCommission - commissionReduction);
    reducedCommissionInput.value = reducedCommission.toFixed(2);

    // Trigger refund calculation
    triggerRefundCalculation();
  }

  // Listen for refund type changes
  if (refundModeSelect) {
    refundModeSelect.addEventListener('change', updateCommissionReductionVisibility);
  }

  // Listen for commission input changes
  if (originalCommissionInput) {
    originalCommissionInput.addEventListener('input', updateReducedCommission);
  }
  if (commissionReductionInput) {
    commissionReductionInput.addEventListener('input', updateReducedCommission);
  }

  // Initialize visibility on page load
  updateCommissionReductionVisibility();
});

// ========================================
// Update the Tax Refund total to include commission reduction
// Add this to your existing refund calculation logic
// ========================================

// When calculating tax refund amount, include commission reduction:
/*
Example (add to your existing refund calculation):

const refundType = document.getElementById('f-mode-f').value;
const taxRefund = parseFloat(document.getElementById('f-tax-f').value || 0);
const commissionReduction = parseFloat(document.getElementById('f-commission-reduction-f').value || 0);

if (refundType === 'TAX_ONLY') {
  // For Tax Refund: include commission reduction in total
  const totalRefund = taxRefund + commissionReduction;
  // Use totalRefund in your calculations
}
*/

// ========================================
// Add commission reduction data when saving entry
// Add this to your collectEntry() or form data collection function
// ========================================

/*
// When collecting form data for refund entry:
const entry = {
  // ... existing fields ...
  originalCommission: parseFloat(document.getElementById('f-original-commission-f').value || 0),
  commissionReduction: parseFloat(document.getElementById('f-commission-reduction-f').value || 0),
  reducedCommission: parseFloat(document.getElementById('f-reduced-commission-f').value || 0),
  // ... rest of fields ...
};
*/

// ========================================
// END OF COMMISSION REDUCTION CODE
// ========================================
