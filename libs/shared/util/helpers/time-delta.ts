export const calculateDaysHoursMinutesSeconds = ( delta: number ) : number[] => {

  const days = Math.floor( delta / 60 / 60 / 24 );
  const remainder = ( delta - ( days * 60 * 60 * 24 ) );

  return( [ days, ...calculateHoursMinutesSeconds( remainder ) ] );
}

const calculateHoursMinutesSeconds = ( delta: number ) : number[] => {

  const hours = Math.floor( delta / 60 / 60 );
  const remainder = ( delta - ( hours * 60 * 60 ) );

  return( [ hours, ...calculateMinutes( remainder ) ] );

}

const calculateMinutes = ( delta: number ) : number[] => {

  const minutes = Math.floor( delta / 60 );
  const remainder = ( delta - ( minutes * 60 ) );

  return( [ minutes ] );

}

const calculateMinutesSeconds = ( delta: number ) : number[] => {

  const minutes = Math.floor( delta / 60 );
  const remainder = ( delta - ( minutes * 60 ) );

  return( [ minutes, ...calculateSeconds( remainder ) ] );

}

const calculateSeconds = ( delta: number ) : number[] => {

  return( [ delta ] );

}

export const format = ( values: number[] ) : string => {

  const units: string[] = [ "Weeks", "Days", "Hours", "Minutes" ];
  const parts: string[] = [];

  // Since the values are calculated largest to smallest, let's iterate over them
  // backwards so that we know which values line up with which units.
  for ( const value of values.slice().reverse() ) {
    const unit = units.pop();
    if(value !== 0)
      parts.unshift( value.toLocaleString() + " " + unit );

  }

  return( parts.join( ", " ) );

}
