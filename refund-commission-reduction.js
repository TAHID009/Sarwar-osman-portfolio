// ========================================
// AeroOps - Refund System with Commission Reduction
// Feature: Tax Refund Commission Reduction
// ========================================

class RefundProcessor {
  constructor() {
    this.refundTypes = {
      FULL: 'Full Refund',
      PARTIAL: 'Partial Refund',
      TAX_REFUND: 'Tax Refund',
      CREDIT_MEMO: 'Credit Memo'
    };
  }

  /**
   * Calculate refund with commission reduction
   * @param {Object} refundData - Refund details
   * @returns {Object} Refund calculation result
   */
  calculateRefund(refundData) {
    const {
      refundType,
      refundAmount,
      commissionAmount,
      commissionReduction = 0,
      taxAmount = 0,
      agentCommission = 0
    } = refundData;

    let calculation = {
      refundType,
      refundAmount,
      originalCommission: commissionAmount,
      commissionReduction: 0,
      reducedCommission: commissionAmount,
      totalRefund: refundAmount,
      taxRefunded: taxAmount,
      agentCommissionImpact: 0,
      breakdown: {}
    };

    // Apply commission reduction for TAX_REFUND type
    if (refundType === this.refundTypes.TAX_REFUND) {
      calculation.commissionReduction = Math.min(commissionReduction, commissionAmount);
      calculation.reducedCommission = commissionAmount - calculation.commissionReduction;
      calculation.agentCommissionImpact = calculation.commissionReduction;

      // Total refund includes both tax refund and commission reduction
      calculation.totalRefund = refundAmount + calculation.commissionReduction;

      calculation.breakdown = {
        taxRefundAmount: refundAmount,
        commissionReduction: calculation.commissionReduction,
        totalCustomerRefund: calculation.totalRefund,
        remainingAgentCommission: calculation.reducedCommission
      };
    }
    // Commission reduction logic for other refund types remains the same
    else if (
      refundType === this.refundTypes.FULL ||
      refundType === this.refundTypes.PARTIAL
    ) {
      if (commissionReduction > 0) {
        calculation.commissionReduction = Math.min(commissionReduction, commissionAmount);
        calculation.reducedCommission = commissionAmount - calculation.commissionReduction;
        calculation.totalRefund = refundAmount + calculation.commissionReduction;
        calculation.agentCommissionImpact = calculation.commissionReduction;
      }

      calculation.breakdown = {
        ticketRefund: refundAmount,
        commissionReduction: calculation.commissionReduction,
        totalCustomerRefund: calculation.totalRefund,
        remainingAgentCommission: calculation.reducedCommission
      };
    }
    // Credit memo: commission typically not reduced
    else if (refundType === this.refundTypes.CREDIT_MEMO) {
      calculation.breakdown = {
        creditAmount: refundAmount,
        commissionReduction: 0,
        totalCredit: refundAmount,
        agentCommission: commissionAmount
      };
    }

    return calculation;
  }

  /**
   * Validate refund data before processing
   */
  validateRefund(refundData) {
    const errors = [];

    if (!refundData.refundType || !Object.values(this.refundTypes).includes(refundData.refundType)) {
      errors.push('Invalid refund type');
    }

    if (refundData.refundAmount < 0) {
      errors.push('Refund amount cannot be negative');
    }

    if (refundData.commissionAmount < 0) {
      errors.push('Commission amount cannot be negative');
    }

    if (refundData.commissionReduction < 0) {
      errors.push('Commission reduction cannot be negative');
    }

    if (refundData.commissionReduction > refundData.commissionAmount) {
      errors.push('Commission reduction cannot exceed original commission');
    }

    // Tax Refund specific validation
    if (refundData.refundType === this.refundTypes.TAX_REFUND) {
      if (!refundData.taxAmount || refundData.taxAmount <= 0) {
        errors.push('Tax Refund requires a valid tax amount');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// ========================================
// Entry Log Management
// ========================================

class EntryLogger {
  /**
   * Create refund entry log with commission reduction details
   */
  static createRefundLog(refundData, calculation) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      type: 'REFUND',
      refundType: calculation.refundType,
      bookingRef: refundData.bookingRef,
      passengerName: refundData.passengerName,
      
      // Original amounts
      originalRefundAmount: calculation.refundAmount,
      originalCommission: calculation.originalCommission,
      
      // Commission reduction details
      commissionReduction: calculation.commissionReduction,
      reducedCommission: calculation.reducedCommission,
      
      // Final amounts
      totalRefund: calculation.totalRefund,
      agentCommissionImpact: calculation.agentCommissionImpact,
      
      // Breakdown
      breakdown: calculation.breakdown,
      
      // Audit trail
      processedBy: refundData.processedBy,
      remarks: refundData.remarks || '',
      status: 'PROCESSED'
    };

    return logEntry;
  }

  /**
   * Format log for display
   */
  static formatLogDisplay(logEntry) {
    let display = `
═══════════════════════════════════════════
REFUND ENTRY LOG
═══════════════════════════════════════════
Date/Time: ${logEntry.timestamp}
Refund Type: ${logEntry.refundType}
Booking Ref: ${logEntry.bookingRef}
Passenger: ${logEntry.passengerName}

CALCULATION SUMMARY:
─────────────────────────────────────────
Original Refund Amount:    ${logEntry.originalRefundAmount.toFixed(2)}
Original Commission:       ${logEntry.originalCommission.toFixed(2)}
Commission Reduction:      ${logEntry.commissionReduction.toFixed(2)}
Reduced Commission:        ${logEntry.reducedCommission.toFixed(2)}
─────────────────────────────────────────
TOTAL REFUND (Customer): ${logEntry.totalRefund.toFixed(2)}
Agent Commission Impact:  ${logEntry.agentCommissionImpact.toFixed(2)}

BREAKDOWN:
${Object.entries(logEntry.breakdown)
  .map(([key, value]) => `  ${key}: ${value.toFixed(2)}`)
  .join('\n')}

Processed By: ${logEntry.processedBy}
Status: ${logEntry.status}
═══════════════════════════════════════════
    `;

    return display;
  }
}

// ========================================
// UI Form Handler
// ========================================

class RefundFormHandler {
  /**
   * Generate refund form HTML with commission reduction for Tax Refund
   */
  static getRefundForm() {
    return `
<div class="refund-form-container">
  <form id="refundForm" class="refund-form">
    
    <fieldset>
      <legend>Refund Details</legend>
      
      <div class="form-group">
        <label for="refundType">Refund Type:</label>
        <select id="refundType" name="refundType" required>
          <option value="">-- Select Refund Type --</option>
          <option value="Full Refund">Full Refund</option>
          <option value="Partial Refund">Partial Refund</option>
          <option value="Tax Refund">Tax Refund</option>
          <option value="Credit Memo">Credit Memo</option>
        </select>
      </div>

      <div class="form-group">
        <label for="refundAmount">Refund Amount:</label>
        <input type="number" id="refundAmount" name="refundAmount" step="0.01" min="0" required>
      </div>

      <div class="form-group" id="taxAmountGroup" style="display:none;">
        <label for="taxAmount">Tax Amount (for Tax Refund):</label>
        <input type="number" id="taxAmount" name="taxAmount" step="0.01" min="0">
      </div>

      <div class="form-group">
        <label for="commissionAmount">Original Commission:</label>
        <input type="number" id="commissionAmount" name="commissionAmount" step="0.01" min="0" required>
      </div>

      <!-- Commission Reduction - Shows only for Tax Refund -->
      <div class="form-group" id="commissionReductionGroup" style="display:none;">
        <label for="commissionReduction">Commission Reduction:</label>
        <input type="number" id="commissionReduction" name="commissionReduction" step="0.01" min="0" value="0">
        <small>Amount of commission to reduce for this refund</small>
      </div>

      <div class="form-group">
        <label for="bookingRef">Booking Reference:</label>
        <input type="text" id="bookingRef" name="bookingRef" required>
      </div>

      <div class="form-group">
        <label for="passengerName">Passenger Name:</label>
        <input type="text" id="passengerName" name="passengerName" required>
      </div>

      <div class="form-group">
        <label for="remarks">Remarks:</label>
        <textarea id="remarks" name="remarks" rows="3"></textarea>
      </div>
    </fieldset>

    <button type="submit" class="btn-primary">Process Refund</button>
    <button type="reset" class="btn-secondary">Clear</button>
  </form>

  <!-- Calculation Preview -->
  <div id="calculationPreview" class="calculation-preview" style="display:none;">
    <h3>Refund Calculation Preview</h3>
    <div id="previewContent"></div>
  </div>
</div>
    `;
  }

  /**
   * Toggle commission reduction field based on refund type
   */
  static setupFormListeners() {
    const refundTypeSelect = document.getElementById('refundType');
    const commissionReductionGroup = document.getElementById('commissionReductionGroup');
    const taxAmountGroup = document.getElementById('taxAmountGroup');

    refundTypeSelect.addEventListener('change', function () {
      const isTaxRefund = this.value === 'Tax Refund';
      
      // Show commission reduction input only for Tax Refund
      commissionReductionGroup.style.display = isTaxRefund ? 'block' : 'none';
      taxAmountGroup.style.display = isTaxRefund ? 'block' : 'none';

      // Reset commission reduction if switching away from Tax Refund
      if (!isTaxRefund) {
        document.getElementById('commissionReduction').value = '0';
      }
    });

    // Real-time calculation preview
    document.getElementById('refundForm').addEventListener('change', function () {
      RefundFormHandler.updateCalculationPreview();
    });
  }

  /**
   * Update calculation preview as user types
   */
  static updateCalculationPreview() {
    const form = document.getElementById('refundForm');
    if (!form.reportValidity()) return;

    const refundData = {
      refundType: form.refundType.value,
      refundAmount: parseFloat(form.refundAmount.value) || 0,
      commissionAmount: parseFloat(form.commissionAmount.value) || 0,
      commissionReduction: parseFloat(form.commissionReduction.value) || 0,
      taxAmount: parseFloat(form.taxAmount.value) || 0
    };

    const processor = new RefundProcessor();
    const calculation = processor.calculateRefund(refundData);

    const preview = `
      <table class="preview-table">
        <tr>
          <td>Refund Amount:</td>
          <td>${calculation.refundAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Original Commission:</td>
          <td>${calculation.originalCommission.toFixed(2)}</td>
        </tr>
        ${
          calculation.commissionReduction > 0
            ? `
        <tr class="highlight-row">
          <td>Commission Reduction:</td>
          <td>${calculation.commissionReduction.toFixed(2)}</td>
        </tr>
        <tr class="highlight-row">
          <td>Reduced Commission:</td>
          <td>${calculation.reducedCommission.toFixed(2)}</td>
        </tr>
            `
            : ''
        }
        <tr class="total-row">
          <td><strong>Total Refund:</strong></td>
          <td><strong>${calculation.totalRefund.toFixed(2)}</strong></td>
        </tr>
      </table>
    `;

    const previewDiv = document.getElementById('calculationPreview');
    document.getElementById('previewContent').innerHTML = preview;
    previewDiv.style.display = 'block';
  }
}

// ========================================
// Data Persistence
// ========================================

class RefundDataStore {
  /**
   * Save refund transaction to storage
   */
  static saveRefundTransaction(logEntry) {
    const transactions = this.getAllTransactions();
    transactions.push(logEntry);
    localStorage.setItem('refund_transactions', JSON.stringify(transactions));
    return logEntry;
  }

  /**
   * Retrieve all refund transactions
   */
  static getAllTransactions() {
    const stored = localStorage.getItem('refund_transactions');
    return stored ? JSON.parse(stored) : [];
  }

  /**
   * Get transaction by ID
   */
  static getTransaction(id) {
    const transactions = this.getAllTransactions();
    return transactions[id];
  }

  /**
   * Export transactions as JSON
   */
  static exportTransactions() {
    const transactions = this.getAllTransactions();
    return JSON.stringify(transactions, null, 2);
  }
}

// ========================================
// Export for use
// ========================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RefundProcessor,
    EntryLogger,
    RefundFormHandler,
    RefundDataStore
  };
}
