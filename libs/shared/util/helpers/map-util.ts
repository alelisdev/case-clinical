function deg2rad(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }
export const getCalculateDistance = (centerLocation: number[], destLocation: number[])=> {
    const R = 3959; // Radius of the Earth in miles
    const dLat = deg2rad(destLocation[0] - centerLocation[0]);
    const dLon = deg2rad(destLocation[1] - centerLocation[1]);
  
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(centerLocation[0])) * Math.cos(deg2rad(destLocation[0])) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
  
    return distance;
  }
