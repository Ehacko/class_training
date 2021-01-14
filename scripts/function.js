const get_stats = (stats) => {
  //let bonus = 1000
  betwin = (min, max) => { return Math.floor(Math.random() * Math.floor(max))+min }
  for (i in stats) {
    if((stats[i].max - stats[i].min)*stats[i].value > bonus) stats[i] = get_max();
    else stats[i] = betwin(stats[i].min, stats[i].max);
  }
  return stats
} 