#!/usr/bin/env ruby

PDFDIR    = "./pdfs"
TEXTDIR   = "./text"
WEBDIR    = "./web"
INDEXFILE = "#{WEBDIR}/index.json"

Dir.mkdir(PDFDIR)  if not Dir.exist?(PDFDIR)
Dir.mkdir(TEXTDIR) if not Dir.exist?(TEXTDIR)

index_file = File.open(INDEXFILE,'w')
index_file.puts '{ "files": ['

num_pdfs = Dir.glob("#{PDFDIR}/*.pdf").length

Dir.glob("#{PDFDIR}/*.pdf").each_with_index do |pdf, pdf_i|
  puts "indexing: #{pdf}"

  basename = File.basename(pdf)
  txt = "#{TEXTDIR}/#{basename}.txt"
  `pdftotext #{pdf} #{txt}`

  index = Hash.new(0)

  File.open(txt,'r:iso-8859-1').readlines.each do |line|
    line.chomp!
    words = line.split(/\W+/)
    words.each do |word|
      if word.length > 0 and word !~ /\d/
        word.downcase!
        index[word] += 1
      end
    end
  end

  descending   = index.sort_by {|k,v| v}.reverse
  num_keywords = descending.length

  index_file.puts "{ \"name\":\"#{basename}\", \"keywords\":{"

  descending.each_with_index do |pair, pair_i|
    index_file.print "\"#{pair[0]}\":#{pair[1]}"
    if pair_i < (num_keywords-1)
      index_file.print ","
    end 
  end
  
  index_file.print "} }"

  if pdf_i < (num_pdfs-1)
    index_file.puts ","
  end

end

index_file.puts "] }"
index_file.close
puts "created index: #{INDEXFILE}"
