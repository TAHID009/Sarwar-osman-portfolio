// ========================================
// ADD THIS TO YOUR app.js or existing script
// Commission Reduction for Tax Refund (and all refund types)
// ========================================

/**
 * Initialize Commission Reduction functionality
 * Call this after DOM is loaded
 */
function initCommissionReduction() {
  const commissionReductionField = document.getElementById('commissionReduction');
  const originalCommissionField = document.getElementById('originalCommission');
  const reducedCommissionField = document.getElementById('reducedCommission');
  const refundTypeSelect = document.getElementById('refundType');

  // Show commission reduction fields when Tax Refund is selected
  if (refundTypeSelect) {
    refundTypeSelect.addEventListener('change', function() {
      showCommissionReductionFields(this.value === 'Tax Refund');
    });
  }

  // Calculate reduced commission on input change
  if (commissionReductionField && originalCommissionField) {
    commissionReductionField.addEventListener('input', updateReducedCommission);
    originalCommissionField.addEventListener('input', updateReducedCommission);
  }
}

/**
 * Show/Hide commission reduction fields based on refund type
 */
function showCommissionReductionFields(showForTaxRefund) {
  const commissionGroup = document.querySelector('[for="commissionReduction"]').parentElement;
  const originalGroup = document.querySelector('[for="originalCommission"]').parentElement;
  const reducedGroup = document.querySelector('[for="reducedCommission"]').parentElement;

  if (showForTaxRefund) {
    commissionGroup.style.display = 'block';
    originalGroup.style.display = 'block';
    reducedGroup.style.display = 'block';
  } else {
    commissionGroup.style.display = 'none';
    originalGroup.style.display = 'none';
    reducedGroup.style.display = 'none';
  }
}

/**
 * Calculate reduced commission (Original Commission - Commission Reduction)
 */
function updateReducedCommission() {
  const originalCommission = parseFloat(
    document.getElementById('originalCommission').value || 0
  );
  const commissionReduction = parseFloat(
    document.getElementById('commissionReduction').value || 0
  );

  // Validate: reduction cannot exceed original
  if (commissionReduction > originalCommission) {
    alert(
      `Commission Reduction ($${commissionReduction.toFixed(2)}) cannot exceed Original Commission ($${originalCommission.toFixed(2)})`
    );
    document.getElementById('commissionReduction').value = originalCommission;
  }

  // Calculate reduced commission
  const reducedCommission = Math.max(0, originalCommission - commissionReduction);

  // Update read-only field
  document.getElementById('reducedCommission').value = reducedCommission.toFixed(2);

  // Update total refund calculation
  updateTotalRefund();
}

/**
 * Update total refund to include commission reduction
 */
function updateTotalRefund() {
  const refundType = document.getElementById('refundType')?.value || '';
  const taxAmount = parseFloat(document.getElementById('tax')?.value || 0);
  const commissionReduction = parseFloat(
    document.getElementById('commissionReduction').value || 0
  );

  // For Tax Refund type, include commission reduction in total
  if (refundType === 'Tax Refund' && commissionReduction > 0) {
    const totalRefund = taxAmount + commissionReduction;
    console.log(
      `Tax Refund Calculation:\n Tax: $${taxAmount.toFixed(2)}\n Commission Reduction: $${commissionReduction.toFixed(2)}\n Total Refund: $${totalRefund.toFixed(2)}`
    );
  }
}

/**
 * Validate Commission Reduction on form submission
 */
function validateCommissionReduction() {
  const refundType = document.getElementById('refundType')?.value || '';

  if (refundType === 'Tax Refund') {
    const originalCommission = parseFloat(
      document.getElementById('originalCommission').value || 0
    );
    const commissionReduction = parseFloat(
      document.getElementById('commissionReduction').value || 0
    );

    if (commissionReduction < 0) {
      alert('Commission Reduction cannot be negative');
      return false;
    }

    if (commissionReduction > originalCommission) {
      alert(
        `Commission Reduction cannot exceed Original Commission ($${originalCommission.toFixed(2)})`
      );
      return false;
    }
  }

  return true;
}

/**
 * Get refund calculation including commission reduction
 */
function getRefundCalculation() {
  const refundType = document.getElementById('refundType')?.value || '';
  const taxAmount = parseFloat(document.getElementById('tax')?.value || 0);
  const originalCommission = parseFloat(
    document.getElementById('originalCommission')?.value || 0
  );
  const commissionReduction = parseFloat(
    document.getElementById('commissionReduction')?.value || 0
  );

  return {
    refundType,
    taxAmount,
    originalCommission,
    commissionReduction,
    reducedCommission: Math.max(0, originalCommission - commissionReduction),
    totalRefund: refundType === 'Tax Refund' ? taxAmount + commissionReduction : taxAmount
  };
}

/**
 * Log refund entry with commission reduction details
 */
function logRefundEntry() {
  const calculation = getRefundCalculation();
  const bookingRef = document.getElementById('ticketNumber')?.value || '';
  const timestamp = new Date().toISOString();

  const logEntry = `
═══════════════════════════════════════════
REFUND ENTRY LOG - ${timestamp}
═══════════════════════════════════════════
Booking Reference: ${bookingRef}
Refund Type: ${calculation.refundType}

TAX REFUND CALCULATION:
─────────────────────────────────────────
Tax Refund Amount:         $${calculation.taxAmount.toFixed(2)}
Original Commission:       $${calculation.originalCommission.toFixed(2)}
Commission Reduction:      $${calculation.commissionReduction.toFixed(2)}
Reduced Commission:        $${calculation.reducedCommission.toFixed(2)}
─────────────────────────────────────────
TOTAL REFUND:              $${calculation.totalRefund.toFixed(2)}
═══════════════════════════════════════════
  `;

  console.log(logEntry);
  return logEntry;
}

// ========================================
// INITIALIZATION
// ========================================

// Call this when your page loads
document.addEventListener('DOMContentLoaded', function() {
  initCommissionReduction();
  
  // Attach validation to form submit
  const refundForm = document.getElementById('refundForm'); // Change to your form ID
  if (refundForm) {
    refundForm.addEventListener('submit', function(e) {
      if (!validateCommissionReduction()) {
        e.preventDefault();
      }
    });
  }
});

// ========================================
// EXAMPLE USAGE IN YOUR FORM
// ========================================

/*
// In your form submission handler:
function handleRefundSubmit(event) {
  event.preventDefault();

  // Validate
  if (!validateCommissionReduction()) {
    return;
  }

  // Get calculation
  const calculation = getRefundCalculation();
  console.log('Refund Calculation:', calculation);

  // Log entry
  const logEntry = logRefundEntry();
  console.log(logEntry);

  // Process refund with calculation.totalRefund
  // which includes commission reduction for Tax Refund
}
*/
