import { List, ListItem, ListItemText } from "@material-ui/core";
import { availableLanguages, translate } from "../../constants/translate";

export const ChangeLanguageMenu= () =>
{
    const t=translate.use().languageSelect

    function switchLanguage(lang:"en"|"fr")
    {
        console.log(lang)
        translate.setOptions(
        {
            language:lang,
            fallback:"en"
        })
    }

    return (
        <>
            <List>
                <ListItem button style={{width:"100%"}} onClick={()=>switchLanguage("en")}>
                    <ListItemText>
                        {t.english}
                    </ListItemText>
                </ListItem>
                <ListItem button style={{width:100}} onClick={()=>switchLanguage("fr")}>
                    <ListItemText>
                        {t.french}
                    </ListItemText>
                </ListItem>
            </List>
        </>
    )
}