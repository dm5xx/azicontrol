<?php

// this file will simulate some kind of (mailfunctioning) rotational device

class Device {

    private $pos;
    private $degPerMS = 0.005;
    private $degInMS;
    private $SKEY = 'device';

    public function __construct()
    {
        $this->degInMS =  1 / $this->degPerMS;
        $this->setupSession();
    }

    // make position persistend and start
    // with random deg when empty
    private function setupSession()
    {
        if( !isset( $_SESSION[ $this->SKEY ] ) )
        {
            $rand = rand(0,90);

            $o = new stdClass();
            $o->timeAssigned = $this->getTime();
            $o->startPosition = 0;
            $o->currentPosition = 0;
            $o->targetPosition  = $rand;
            $o->timeReached     = $o->timeAssigned + ( $this->degInMS * $rand );
            $o->timeDiff        = $o->timeReached - $o->timeAssigned;
            $o->running         = true;

            $_SESSION[ $this->SKEY ] = $o;
        }
        $this->pos = $_SESSION[ $this->SKEY ];


    }

    // update session
    private function updateSession( $pos )
    {
        $_SESSION[ $this->SKEY ] = $pos;
        $this->pos = $pos;
    }

    // set new angle
    public function setAngle( $deg )
    {
        $pos = $this->getCurrentPosition();

        if( $deg > $pos->currentPosition ) {
            $tavel = $deg - $pos->currentPosition;
        } else {
            $tavel = $deg - $pos->currentPosition - $deg;
        }



        $o = new stdClass();
        $o->timeAssigned    = $this->getTime();
        $o->startPosition   = $pos->currentPosition;
        $o->currentPosition = $pos->currentPosition;
        $o->targetPosition  = $deg;
        $o->timeReached     = $o->timeAssigned + ( $this->degInMS * $tavel );
        $o->timeDiff        = $o->timeReached - $o->timeAssigned;
        $o->running         = true;

        $this->pos = $o;

        $this->updateSession( $o );
    }

    public function getCurrentPosition()
    {
        $now = $this->getTime();

        $pos = $this->pos;

        if( $now > $pos->timeReached )
        {
            $pos->running = false;
            $pos->timeDiff = 0;
            $pos->currentPosition = $pos->targetPosition;



        }
        else
        {


            $timeLeft = $pos->timeReached - $now;
            $timeGone = $pos->timeDiff - $timeLeft;
            $pos->currentPosition = $pos->startPosition + round( $timeGone * $this->degPerMS );
            $pos->running = true;
        }

        $this->updateSession( $pos );

        return $pos;



    }

    private function getTime()
    {
        return round(microtime(true) * 1000);
    }


}
