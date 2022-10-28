import { v4 as uuid } from 'uuid';

export default class Char {
  constructor(index, char, siteID, attributes, id = uuid()) {
    this.index = index;
    this.char = char;
    this.siteID = siteID;
    this.tombstone = false;
    this.bold = attributes !== undefined && "bold" in attributes ? attributes["bold"] : this.bold;
    this.italic = attributes !== undefined && "italic" in attributes ? attributes["italic"] : this.italic;
    this.underline = attributes !== undefined && "underline" in attributes ? attributes["underline"] : this.underline;
    this.id = id;
  }

  update(attributes) {
    this.bold = attributes !== undefined && "bold" in attributes ? attributes["bold"] : this.bold;
    this.italic = attributes !== undefined && "italic" in attributes ? attributes["italic"] : this.italic;
    this.underline = attributes !== undefined && "underline" in attributes ? attributes["underline"] : this.underline;
  }
}