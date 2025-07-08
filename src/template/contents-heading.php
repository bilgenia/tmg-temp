<?php

use Framework\Helper;

?>

<header class="l-contents__header">
    <div class="l-contents__container c-container">
        <h1 class="c-entry__title">
            <?php
            if (is_archive()) {
                single_term_title();
            } else {
                the_title();
            }
            ?>
        </h1>
    </div>
</header>