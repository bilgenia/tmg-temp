<?php

function page_loader()
{
?>
    <div class='c-loading' aria-hidden='false' data-clarity-mask='true'>
        <!-- <div class='c-loading__item'>Loading ... </div> -->
        <div class="loading-14"></div>
    </div>
<?php
}
add_action('wp_body_open', 'page_loader');
