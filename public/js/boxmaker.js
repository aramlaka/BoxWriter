$(function () {
    $("#box-form").change(function () {
        var text = $("#box-text").val();
        var label = $("#box-label").val();
        var spacing = Number($("#box-spacing").val());
        var offset = Number($("#box-offset").val());
        var spaceChar = $("#box-space-char").val();
        
        $("#box-render").text("");
        $("#box-render").append(boxify(text, label, spacing, offset, spaceChar));
    });
    
    function boxify (text, label, spacing, offset, spaceChar) {
        var box = "";
        
        if (!spaceChar) {
            var spaceChar = " ";
        }
        
        if (!spacing) {
            var spacing = 2;
        }
        
        if (!offset) {
            var offset = 10;
        }
        
        for (var i = text.length - 1; i > 0; i--) {
            box += spacer(offset);
            box += spacer(i, spaceChar);
            
            if (i+1 === text.length) {
                box += spaceText(text, spacing, true, spaceChar);
            } else {
                box += text.substring(i, i+1);
                box += spacer((text.length * (spacing + 1) - (spacing + 2)), spaceChar);
                box += text.substring(text.length - (i+1), text.length - i);
                box += spacer(text.length - i - 2, spaceChar);
                box += text.substring(text.length - (i+1), text.length - i);
            }
            
            if (i === 1) {
                box += "\n";
                box += spacer(offset);
                box += spaceText(text, spacing, false, spaceChar);
                box += spacer(text.length - 2, spaceChar);
                box += text.substring(text.length - i, text.length);
            }
            
            box += "\n";
        }
        
        for (var i = text.length - 1; i > 1; i--) {
            box += spacer(offset);
            box += text.substring(text.length - i, text.length - i + 1);
            
            box += spacer(spaceText(text, spacing, false).length - 2, spaceChar);
            
            box += text.substring(i - 1, i);
            box += spacer(text.length - 2 - (text.length - i), spaceChar);
            
            if (i > 1) {
                box += text.substring(i - 1, i);
            }
            
            box += "\n";
        }
        
        box += spacer(offset);
        box += spaceText(text, spacing, true, spaceChar);
        
        console.log(box);
        
        return box;
    }
    
    function spacer (numSpaces, character) {
        var spaceString = "";
        
        if (!character) {
            var character = " ";
        }
        
        for (var i = 0; i < numSpaces; i++) {
            spaceString += character;
        } 
        
        return spaceString;
    }
    
    function spaceText (text, spacing, reverse, character) {
        var spacedText = "";
        
        if (!character) {
            var character = "";
        }
        
        if (!reverse) {
            for (var i = 0; i < text.length; i++) {
                
                spacedText += text.substring(i, i+1);
                
                if (i < text.length - 1) {
                    spacedText += spacer(spacing, character);   
                }
            }
        } else {
            for (var i = text.length; i > 0; i--) {
                
                spacedText += text.substring(i-1, i);
                
                if (i > 1) {
                    spacedText += spacer(spacing, character);   
                }
            }
        }
        
        return spacedText;
    }
});