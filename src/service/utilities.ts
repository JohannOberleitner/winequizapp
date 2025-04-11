
export function shuffleArray<T>(array: T[]): T[] {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function round(amount: number, roundingSize: number): number {
  /* Provides certaing rounding rules, depending how large the value was
     Makes no sense to round with same rules for different concepts because of
    different magnitudes
     1) roundingSize < 0.1: Eg for production amount of a country it is 0.1 
     amount * round(1/roundingSize) / roundigngSize
        Example: amount = 3.9
                 roundingSize = 0.1:  roundingSizeInverted = 10
                 adjusted:  
                   1: 3.9 * 10 = 39
                   2: round (39) = 39
                   3: 39 / 10 = 3.9
        Rounds up to 0.1 precisely. Smaller commas will be rounded away       
      2) roundingSize > 1.0: Eg. for WineArea of a country it is 100.0
         Example: amoun = 15200
                  roudingSize = 100.0
                  adjusted = 
                    1: 15200 / 100 = 15.2
                    2: round(15.2) = 15
                    3: 15 * 100    = 15000
  */
  if (roundingSize < 1.0 ) {
    let roundingSizeInverted = Math.round(1/roundingSize);
    return  Math.round(amount * roundingSizeInverted)/  roundingSizeInverted;
  } else {
    return  Math.round(amount / roundingSize)*  roundingSize;
  }
}