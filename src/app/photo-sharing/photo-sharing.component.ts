import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-photo-sharing',
  templateUrl: './photo-sharing.component.html',
  styleUrls: ['./photo-sharing.component.css']
})
export class PhotoSharingComponent implements OnInit {

  imageRoot = 'assets/images/';

  root: string;
  folderOpening:string;

  numCols = 3;
  gridColClass = 'col-md-4';

  folders = [];

  colClass = [];

  images = [];

  fFolder = '';
  slides: string;
  slideIndex = 1;
  modalSlideIndex = 1;
  modalImages = [];
  router;
  viewCount = 0;

  imgCount: number;

  /**
   * Constructor
   * @param _router
   */
  constructor(private _router: Router, private http:HttpClient) {
    this.router = _router;    
  }

  ngOnInit() {
    this.root = this.router.url.split("/")[1];
    // console.log(this.root);
    this.imageRoot += this.root + '/';

    this.slides = this.root + 'Slides';

    // Wait 3 seconds to start slide show
    setTimeout(() => this.carousel(), 3000);
    setTimeout(() => this.showDivs(this.slideIndex), 500);
    this.getAlbums();
    this.getViewCount();
  }

  /**
   * openFolder
   * @param index 
   * @param folderTitle 
   */
  openFolder(index, folderTitle) {

    var openFolder = document.getElementById('open' + index);
    var closeFolder = document.getElementById('close' + index);
    var folderDiv = document.getElementById('folder' + index);

    this.imgCount = 0;

    openFolder.className = 'hide';
    closeFolder.className = 'show';
    folderDiv.className = 'show';

    this.folderOpening = folderTitle;

    // Check if we need to load images
    if (!this.images.hasOwnProperty(folderTitle) || this.images[folderTitle].length < 1) {

      // Request images                
      this.getImages(folderTitle);

    }

  }

  /**
   * 
   * @param index 
   */
  closeFolder(index) {

    var openFolder = document.getElementById('open' + index);
    var closeFolder = document.getElementById('close' + index);
    var folder = document.getElementById('folder' + index);

    closeFolder.className = 'hide';
    openFolder.className = 'show';
    folder.className = 'hide';

  }

  /**
   * 
   * @param response 
   */
  handleImgSuccess(response) {

    // Got data
    this.images[this.folderOpening] = this.setupImageGridData(response);
    this.colClass[this.folderOpening] = this.setGridColClass(response.length);

  }

  /**
   * 
   * @param subfolder 
   */
  getImages(subfolder) {

    let params = new HttpParams()
    .set('folder', this.root + '/' + subfolder)
    .set('subfolder', subfolder);

    this.http.get('loadImages.php', { params: params })
      .subscribe(response=>{
        console.log('success ' + response);
        this.handleImgSuccess(response);
      },error=>{
        console.log('Error ' + error);
      });

  }

  /**
   * 
   * @param numCols 
   */
  setGridColClass(numCols) {

    var colClass = 'col-md-6';

    switch (numCols) {

      case 1:
        this.numCols = 1;
        colClass = 'col-md-12';
        break;

        default:
        this.numCols = 2;
        colClass = 'col-md-6';

      // case 4:
      // case 2:
      // case 7:
      //   this.numCols = 2;
      //   colClass = 'col-md-6';
      //   break;

      // default:
      //   this.numCols = 3;
      //   colClass = 'col-md-4';
    }

    return colClass;

  }

  //
  // Setup grid as follows:
  //      3 columns is default
  //      1 column, 1 image
  //      2 columns, 4,2 or 7 images
  //
  setupImageGridData(response) {

    // An array of rows
    var rows = [];
    var row = [];
    var colCounter = 0;
    var data = response;

    this.setGridColClass(data.length);

    for (var i = 0; i < data.length; i++) {
      // Loop thru images

      // Add image to row 
      row.push(this.imageRoot + this.folderOpening + '/' + data[i]);

      colCounter++;

      if (colCounter === this.numCols || i === data.length - 1) {
        // Start new row

        colCounter = 0;

        // Add row to rows
        rows.push(row);

        // Clear row
        row = [];
      }

    }

    return rows;
  }

  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  }

  currentDiv(n) {
    this.showDivs(this.slideIndex = n);
  }

  showDivs(n) {
    let i;
    let x = document.getElementsByClassName(this.slides) as HTMLCollectionOf<HTMLElement>;

    if (x.length < 1) {
      return;
    }
    if (n > x.length) { this.slideIndex = 1 }
    if (n < 1) { this.slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    x[this.slideIndex - 1].style.display = "block";
  }

  /**
   * 
   * @param response 
   */
  processFolders(response) {

    this.folders = response;

  }

  /**
   * 
   * @param response 
   */
  processViewCount(response) {

    this.viewCount = response;

  }

  getAlbums() {

    let params = new HttpParams()
    .set('folder', this.root);

    this.http.get('loadFolders.php', { params: params })
      .subscribe(response=>{
        console.log('success ' + response);
        this.processFolders(response);
      },error=>{
        console.log('Error ' + error);
      });

  }

  /**
   * Get page hit count
   */
  getViewCount() {

    let params = new HttpParams()
    .set('folder', this.root);

    this.http.get('loadPageCount.php', { params: params })
      .subscribe(response=>{
        console.log('success ' + response);
        this.processViewCount(response);
      },error=>{
        console.log('Error ' + error);
      });

  }

  /**
   * 
   */
  carousel() {
    let i;
    let x = document.getElementsByClassName(this.slides) as HTMLCollectionOf<HTMLElement>;
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    this.slideIndex++;
    if (this.slideIndex > x.length) { this.slideIndex = 1 }
    x[this.slideIndex - 1].style.display = "block";
    setTimeout(() => this.carousel(), 5000);
  }

  /**
   * Modal code
   */
  openModal(folder:string, imgId:number) {

    // clear out any images
    document.getElementById("modalContent").innerHTML = "";

    // console.log(folder + ' row count is ' +  this.images[folder].length);

    for (let x = 0; x < this.images[folder].length; x++) {
      
      // console.log('Row ' + x + ': ' + this.images[folder][x]);

      for (let y = 0; y < this.images[folder][x].length; y++) {

        // console.log('Image: ' + this.images[folder][x][y]);

        let htmlString = `<img src="${this.images[folder][x][y]}" style="width:100%">`;
        let node = document.createElement("div");
        node.setAttribute("class", "mySlides");
        node.innerHTML = htmlString;
        document.getElementById("modalContent").appendChild(node);    

      }
    }

    this.modalSlideIndex = imgId;

    this.showSlides(imgId);

    document.getElementById('imageModal').style.display = "block";
  }

  // Close the Modal
  closeModal() {
    document.getElementById('imageModal').style.display = "none";
  }

  // Next/previous controls
  plusSlides(n) {
    this.showSlides(this.modalSlideIndex += n);
  }

  showSlides(n) {
    let i : number;
    let slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;

    if (n >= slides.length) {
      this.modalSlideIndex = 0;
    }

    if (n < 0) {
      this.modalSlideIndex = slides.length-1;
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slides[this.modalSlideIndex].style.display = "block";
  }
    
}