var Range = (function() {

  function Range(from, to) {
    if (typeof from !== "number")
      throw "from property must be number";
    if (typeof to !== "number")
      throw "to property must be number";
    if (from > to)
      throw "from cant be grater than must be less or equal to";
    this.from = from;
    this.to = to;
  }

  Range.prototype.contain = function(point) {
    return this.from <= point && point <= this.to;
  };

  Range.prototype.intersect = function(range) {
    return this.contain(range.to) || this.contain(range.from) || range.contain(this.from);
  };

  Range.prototype.center = function() {
    return (this.from + this.to) >> 1;
  };

  Range.prototype.nearCenter = function(range, margin) {
    var center = this.center();
    return new Range(center - margin, center + margin).intersect(range);
  };

  Range.prototype.percentage = function(point) {
    if (!this.contain(point))
      throw "cant estimate % unless point inside range scope";
    return (point - this.from) / height.call(this);
  };

  function height() {
    return this.to - this.from;
  }

  return Range;
})();
