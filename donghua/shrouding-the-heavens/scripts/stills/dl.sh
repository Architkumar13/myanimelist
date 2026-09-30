export SSL_CERT_FILE=/tmp/ytenv/cacert.pem
cd /tmp/stills
while IFS=$'\t' read ep id; do
  f=vid/ep$(printf %02d $ep).mp4
  [ -s "$f" ] && continue
  echo "$ep $id"
done < eps.tsv | xargs -P 6 -n 2 sh -c '/tmp/ytenv/bin/yt-dlp -q --no-warnings -f 134 -o "vid/ep$(printf %02d $0).mp4" "https://www.youtube.com/watch?v=$1"'
