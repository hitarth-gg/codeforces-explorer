<script src="https://unpkg.com/split-type"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js"></script>
<script>
let typeSplit = new SplitType('[animate]', {
  types: 'lines, words, chars',
  tagName: 'span'
})
gsap.from('[animate] .line', {
	y: '100%',
  opacity: 0,
  duration: 0.5,
  stagger: 0.1,
  ease: 'power1.out',
})
</script>
