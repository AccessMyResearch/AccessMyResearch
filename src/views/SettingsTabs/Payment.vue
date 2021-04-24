<template>
<div >
    <!-- <P>This will be the Payment page</P> -->
    <div class="card card-fluid">
        <div class="row">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4 mx-auto">
                <div id="pay-invoice" class="card">
                    <div class="card-body">
                        <div class="card-title">
                            <h3 class="text-center">Payment detail</h3>
                        </div>
                        <hr>
                        <form action="/echo" method="post" novalidate="novalidate" class="needs-validation">
                            <div class="form-group">
                                <label for="cc-number" class="control-label mb-1">Card number</label>
                                <input id="cc-number" name="cc-number" type="tel" class="form-control cc-number identified visa" required autocomplete="off"  >
                                <span class="invalid-feedback">Enter a valid 12 to 16 digit card number</span>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-group">
                                        <label for="cc-exp" class="control-label mb-1">Expiration</label>
                                        <input id="cc-exp" name="cc-exp" type="tel" class="form-control cc-exp" required placeholder="MM / YY" autocomplete="cc-exp">
                                        <span class="invalid-feedback">Enter the expiration date</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label for="x_card_code" class="control-label mb-1">CVV</label>
                                    <div class="input-group">
                                        <input id="x_card_code" name="x_card_code" type="tel" class="form-control cc-cvc" required autocomplete="off">
                                        <span class="invalid-feedback order-last">Enter the 3-digit code on back</span>
                                        <div class="input-group-append">
                                            <div class="input-group-text">
                                            <span class="fa fa-question-circle fa-lg" data-toggle="popover" data-container="body" data-html="true" data-title="CVV"
                                            data-content="<div class='text-center one-card'>The 3 digit code on back of the card..<div class='visa-mc-cvc-preview'></div></div>"
                                            data-trigger="hover"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="x_zip" class="control-label mb-1">Postal code</label>
                                <input id="x_zip" name="x_zip" type="text" class="form-control" value="" data-val="true" data-val-required="Please enter the ZIP/Postal code" autocomplete="postal-code">
                                <span class="help-block" data-valmsg-for="x_zip" data-valmsg-replace="true"></span>
                            </div>
                            <div>
                                <button id="payment-button" type="submit" class="btn btn-lg btn-info btn-block">
                                    <i class="fa fa-lock fa-lg"/>&nbsp;
                                    <span id="payment-button-amount">save </span>
                                    <span id="payment-button-sending" style="display:none;">Sending…</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>