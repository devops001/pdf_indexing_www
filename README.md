pdf_indexing_www
================

Indexing and searching PDFs in a web page.  Very simple and easy to customize. 

The indexing is done by a Ruby script and requires the "pdftotext" tool. 

The indexing file format is a single JSON file.

The search is provided by html, javascript, and CSS.

![alt tag](https://cloud.githubusercontent.com/assets/8508035/4904483/00abffd0-6448-11e4-9c60-623ed53fd45f.png)

To use:

* put your PDFs in a directory named "./pdfs" (or change the path in the create_index.rb script).
* run the create_index.rb script
* open the html file in the "./web" directory.


